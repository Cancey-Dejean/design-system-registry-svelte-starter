import ts from "typescript";

import type { RegistryFlowApi, RegistryFlowProp, RegistryFlowVariant } from "./flow-data";

const MAX_TYPE_LENGTH = 240;

/** Props every component forwards rather than declares as part of its own API. */
const IGNORED_PROPS = new Set(["class", "ref", "children", "child"]);

export type RegistryFlowApiSource = {
  name: string;
  /** The item's source files: project-relative path and file contents. */
  files: readonly { path: string; code: string }[];
};

type TypeDeclarations = Map<string, ts.TypeNode | ts.InterfaceDeclaration>;

/**
 * Reads the public API of a registry item: `tv` variants from its
 * `*.variants.ts` files, and the props its main component declares itself in
 * `$props()`. Inherited props such as HTML attributes are left out.
 *
 * This is syntactic only — it never type checks — so it resolves the type
 * aliases an item declares in its own files and skips everything imported.
 */
export function getRegistryItemApi({ name, files }: RegistryFlowApiSource): RegistryFlowApi {
  const tvVariants = dedupeByName(
    files
      .filter((file) => file.path.endsWith(".variants.ts"))
      .flatMap((file) => readVariants(parse(file.path, file.code))),
  );
  const component = findMainComponent(name, files);

  if (!component) {
    return { variants: tvVariants, props: [] };
  }

  const script = parse(component.path, getSvelteScripts(component.code));
  const declaration = findPropsDeclaration(script);

  if (!declaration) {
    return { component: toPascalCase(name), variants: [], props: [] };
  }

  const declarations: TypeDeclarations = new Map();

  for (const file of files) {
    if (file.path.endsWith(".ts")) {
      collectTypeDeclarations(parse(file.path, file.code), declarations);
    }
  }

  // Declared last so a component's own aliases win over same-named ones elsewhere.
  collectTypeDeclarations(script, declarations);

  return {
    component: toPascalCase(name),
    ...readComponentApi(declaration, declarations, tvVariants),
  };
}

function parse(path: string, code: string): ts.SourceFile {
  return ts.createSourceFile(path, code, ts.ScriptTarget.ES2022, true, ts.ScriptKind.TS);
}

function getSvelteScripts(code: string): string {
  return [...code.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gu)]
    .map((match) => match[1])
    .join("\n");
}

function findMainComponent(name: string, files: RegistryFlowApiSource["files"]) {
  const components = files.filter((file) => file.path.endsWith(".svelte"));

  return components.find((file) => file.path.endsWith(`/${name}.svelte`)) ?? components[0];
}

function readVariants(sourceFile: ts.SourceFile): RegistryFlowVariant[] {
  const variants: RegistryFlowVariant[] = [];

  function visit(node: ts.Node) {
    if (ts.isObjectLiteralExpression(node)) {
      const variantsObject = getObjectProperty(node, "variants");

      if (variantsObject) {
        const defaults = getObjectProperty(node, "defaultVariants");

        for (const property of variantsObject.properties) {
          if (!ts.isPropertyAssignment(property)) {
            continue;
          }

          const variantName = getPropertyName(property.name);
          const options = ts.isObjectLiteralExpression(property.initializer)
            ? property.initializer.properties.flatMap((option) => {
                const optionName = option.name ? getPropertyName(option.name) : undefined;

                return optionName ? [optionName] : [];
              })
            : [];
          const defaultValue = defaults ? getLiteralProperty(defaults, variantName) : undefined;

          if (variantName && options.length > 0) {
            variants.push({
              name: variantName,
              options,
              ...(defaultValue === undefined ? {} : { defaultValue }),
            });
          }
        }

        return;
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);

  return variants;
}

function findPropsDeclaration(sourceFile: ts.SourceFile): ts.VariableDeclaration | undefined {
  let found: ts.VariableDeclaration | undefined;

  function visit(node: ts.Node) {
    if (
      !found &&
      ts.isVariableDeclaration(node) &&
      node.initializer &&
      ts.isCallExpression(node.initializer) &&
      ts.isIdentifier(node.initializer.expression) &&
      node.initializer.expression.text === "$props"
    ) {
      found = node;
      return;
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);

  return found;
}

function collectTypeDeclarations(sourceFile: ts.SourceFile, declarations: TypeDeclarations) {
  for (const statement of sourceFile.statements) {
    if (ts.isTypeAliasDeclaration(statement)) {
      declarations.set(statement.name.text, statement.type);
    } else if (ts.isInterfaceDeclaration(statement)) {
      declarations.set(statement.name.text, statement);
    }
  }
}

/** The property signatures a type declares itself, following the item's own aliases. */
function getOwnMembers(
  node: ts.TypeNode | ts.InterfaceDeclaration | undefined,
  declarations: TypeDeclarations,
  seen = new Set<string>(),
): { members: ts.PropertySignature[]; hasVariantProps: boolean } {
  const members: ts.PropertySignature[] = [];
  let hasVariantProps = false;

  const visit = (current: ts.TypeNode | ts.InterfaceDeclaration | undefined) => {
    if (!current) {
      return;
    }

    if (ts.isInterfaceDeclaration(current) || ts.isTypeLiteralNode(current)) {
      members.push(...current.members.filter(ts.isPropertySignature));
    } else if (ts.isIntersectionTypeNode(current)) {
      current.types.forEach(visit);
    } else if (ts.isParenthesizedTypeNode(current)) {
      visit(current.type);
    } else if (ts.isTypeReferenceNode(current) && ts.isIdentifier(current.typeName)) {
      const name = current.typeName.text;

      if (name === "VariantProps") {
        hasVariantProps = true;
      } else if (!seen.has(name)) {
        seen.add(name);
        visit(declarations.get(name));
      }
    }
  };

  visit(node);

  return { members, hasVariantProps };
}

function readComponentApi(
  declaration: ts.VariableDeclaration,
  declarations: TypeDeclarations,
  tvVariants: readonly RegistryFlowVariant[],
): Pick<RegistryFlowApi, "variants" | "props"> {
  const defaults = getBindingDefaults(declaration);
  const { members, hasVariantProps } = getOwnMembers(declaration.type, declarations);
  const variants: RegistryFlowVariant[] = [];
  const props: RegistryFlowProp[] = [];

  for (const member of members) {
    const name = getPropertyName(member.name);

    if (IGNORED_PROPS.has(name) || variants.some((variant) => variant.name === name)) {
      continue;
    }

    const tvVariant = tvVariants.find((variant) => variant.name === name);
    const options = tvVariant?.options ?? getStringLiteralOptions(member.type, declarations);
    const defaultValue = defaults.get(name) ?? tvVariant?.defaultValue;

    if (options) {
      variants.push({ name, options, ...(defaultValue === undefined ? {} : { defaultValue }) });
      continue;
    }

    props.push({
      name,
      type: formatType(member.type?.getText() ?? "unknown"),
      optional: member.questionToken !== undefined,
      ...(defaultValue === undefined ? {} : { defaultValue }),
    });
  }

  // `VariantProps<typeof x>` spreads every variant in as a prop without naming them.
  if (hasVariantProps) {
    for (const tvVariant of tvVariants) {
      if (!variants.some((variant) => variant.name === tvVariant.name)) {
        const defaultValue = defaults.get(tvVariant.name) ?? tvVariant.defaultValue;

        variants.push({
          name: tvVariant.name,
          options: tvVariant.options,
          ...(defaultValue === undefined ? {} : { defaultValue }),
        });
      }
    }
  }

  return {
    variants: variants.toSorted(
      (a, b) => getVariantOrder(a, tvVariants) - getVariantOrder(b, tvVariants),
    ),
    props: props.toSorted(
      (a, b) => Number(a.optional) - Number(b.optional) || a.name.localeCompare(b.name),
    ),
  };
}

function getStringLiteralOptions(
  node: ts.TypeNode | undefined,
  declarations: TypeDeclarations,
  seen = new Set<string>(),
): string[] | undefined {
  if (!node) {
    return undefined;
  }

  if (ts.isParenthesizedTypeNode(node)) {
    return getStringLiteralOptions(node.type, declarations, seen);
  }

  if (ts.isTypeReferenceNode(node) && ts.isIdentifier(node.typeName)) {
    const name = node.typeName.text;
    const target = declarations.get(name);

    if (!target || ts.isInterfaceDeclaration(target) || seen.has(name)) {
      return undefined;
    }

    seen.add(name);

    return getStringLiteralOptions(target, declarations, seen);
  }

  if (!ts.isUnionTypeNode(node)) {
    return undefined;
  }

  const members = node.types.filter(
    (member) => member.kind !== ts.SyntaxKind.UndefinedKeyword && !isNullLiteral(member),
  );
  const options = members.flatMap((member) =>
    ts.isLiteralTypeNode(member) && ts.isStringLiteralLike(member.literal)
      ? [member.literal.text]
      : [],
  );

  return options.length >= 2 && options.length === members.length ? options : undefined;
}

function isNullLiteral(node: ts.TypeNode): boolean {
  return ts.isLiteralTypeNode(node) && node.literal.kind === ts.SyntaxKind.NullKeyword;
}

function getVariantOrder(
  variant: RegistryFlowVariant,
  tvVariants: readonly RegistryFlowVariant[],
): number {
  const index = tvVariants.findIndex((tvVariant) => tvVariant.name === variant.name);

  return index === -1 ? tvVariants.length : index;
}

function formatType(value: string): string {
  const formatted = value
    .replaceAll(/\s+/gu, " ")
    .trim()
    .replace(/\s*\|\s*undefined$/u, "");

  return formatted.length > MAX_TYPE_LENGTH
    ? `${formatted.slice(0, MAX_TYPE_LENGTH - 1)}…`
    : formatted;
}

function getBindingDefaults(declaration: ts.VariableDeclaration): Map<string, string> {
  const defaults = new Map<string, string>();

  if (ts.isObjectBindingPattern(declaration.name)) {
    for (const element of declaration.name.elements) {
      const propertyName = element.propertyName ?? element.name;
      const initializer = element.initializer && unwrapBindable(element.initializer);

      if (initializer && (ts.isIdentifier(propertyName) || ts.isStringLiteral(propertyName))) {
        defaults.set(
          propertyName.text,
          ts.isStringLiteralLike(initializer) ? initializer.text : initializer.getText(),
        );
      }
    }
  }

  return defaults;
}

/** `value = $bindable("a")` defaults to `"a"`; a bare `$bindable()` has no default. */
function unwrapBindable(initializer: ts.Expression): ts.Expression | undefined {
  if (
    ts.isCallExpression(initializer) &&
    ts.isIdentifier(initializer.expression) &&
    initializer.expression.text === "$bindable"
  ) {
    return initializer.arguments[0];
  }

  return initializer;
}

function getObjectProperty(
  node: ts.ObjectLiteralExpression,
  name: string,
): ts.ObjectLiteralExpression | undefined {
  for (const property of node.properties) {
    if (
      ts.isPropertyAssignment(property) &&
      getPropertyName(property.name) === name &&
      ts.isObjectLiteralExpression(property.initializer)
    ) {
      return property.initializer;
    }
  }

  return undefined;
}

function getLiteralProperty(node: ts.ObjectLiteralExpression, name: string): string | undefined {
  for (const property of node.properties) {
    if (!ts.isPropertyAssignment(property) || getPropertyName(property.name) !== name) {
      continue;
    }

    const { initializer } = property;

    if (ts.isStringLiteralLike(initializer) || ts.isNumericLiteral(initializer)) {
      return initializer.text;
    }

    if (initializer.kind === ts.SyntaxKind.TrueKeyword) {
      return "true";
    }

    if (initializer.kind === ts.SyntaxKind.FalseKeyword) {
      return "false";
    }
  }

  return undefined;
}

function getPropertyName(name: ts.PropertyName): string {
  return ts.isIdentifier(name) || ts.isStringLiteralLike(name) || ts.isNumericLiteral(name)
    ? name.text
    : name.getText();
}

function dedupeByName<T extends { name: string }>(entries: readonly T[]): T[] {
  const seen = new Set<string>();

  return entries.filter((entry) => !seen.has(entry.name) && seen.add(entry.name));
}

function toPascalCase(value: string): string {
  return value
    .split(/[-_\s]+/u)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}
