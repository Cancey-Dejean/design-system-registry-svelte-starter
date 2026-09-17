#!/usr/bin/env bun

import { existsSync } from "node:fs";
import { join, relative } from "node:path";

import {
  getRegistryDiagnostics,
  getRegistryDoctorExitCode,
  type RegistryDiagnostic,
  type RegistryDiagnostics,
} from "../src/lib/registry/diagnostics";

const root = process.cwd();
const registryRoot = join(root, "registry");

const files = await readRegistryFiles(registryRoot);
const registryDiagnostics = getRegistryDiagnostics({
  files,
  fileExists: (path) => existsSync(join(root, path)),
});

printRegistryDiagnostics(registryDiagnostics);

process.exitCode = getRegistryDoctorExitCode(registryDiagnostics);

async function readRegistryFiles(dir: string): Promise<Record<string, string>> {
  const entries: [string, string][] = [];

  for await (const path of new Bun.Glob("**/*").scan({
    absolute: true,
    cwd: dir,
    onlyFiles: true,
  })) {
    entries.push([toRegistryPath(path), await Bun.file(path).text()]);
  }

  return Object.fromEntries(entries);
}

function toRegistryPath(path: string): string {
  return relative(root, path).replace(/\\/gu, "/");
}

function printRegistryDiagnostics(result: RegistryDiagnostics): void {
  if (result.errors.length === 0 && result.warnings.length === 0) {
    console.log("Registry doctor passed.");
    return;
  }

  printDiagnosticGroup("Errors", result.errors);
  printDiagnosticGroup("Warnings", result.warnings);
}

function printDiagnosticGroup(title: string, findings: readonly RegistryDiagnostic[]): void {
  if (findings.length === 0) {
    return;
  }

  console.log(`${title}:`);

  for (const diagnostic of findings) {
    console.log(`- ${diagnostic.path}: ${diagnostic.message}`);
  }
}
