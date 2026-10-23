<script module lang="ts">
 import { defineMeta } from "@storybook/addon-svelte-csf";
 import * as CodeBlock from "../index.js";
 const code = 'import { mount } from "svelte";\nimport App from "./App.svelte";\n\nmount(App, { target: document.body });';
 const { Story } = defineMeta({ title: "Components/CodeBlock", tags: ["autodocs"], parameters: { centered: true } });
</script>

<Story name="Default">
 <CodeBlock.Root class="w-full max-w-xl">
  <CodeBlock.Header><CodeBlock.Title>main.ts</CodeBlock.Title><CodeBlock.Actions><CodeBlock.CopyButton value={code} /></CodeBlock.Actions></CodeBlock.Header>
  <CodeBlock.Content {code} />
  <CodeBlock.Footer>Svelte 5 · TypeScript</CodeBlock.Footer>
 </CodeBlock.Root>
</Story>
<Story name="Numbered Lines">
 <CodeBlock.Root class="w-full max-w-xl"><CodeBlock.Content {code} lineNumbers startLine={10} /></CodeBlock.Root>
</Story>
<Story name="Compact">
 <CodeBlock.Root size="sm" class="w-full max-w-xl"><CodeBlock.Header><CodeBlock.Title>Terminal</CodeBlock.Title></CodeBlock.Header><CodeBlock.Content code="npm install svelte" /></CodeBlock.Root>
</Story>
<Story name="Destructive">
 <CodeBlock.Root variant="destructive" class="w-full max-w-xl"><CodeBlock.Content code="Error: Missing required configuration." /></CodeBlock.Root>
</Story>
<Story name="Diff">
 <CodeBlock.Root class="w-full max-w-xl"><CodeBlock.Content lineNumbers><CodeBlock.Line code="const framework = 'react';" variant="removed" /><CodeBlock.Line code="const framework = 'svelte';" variant="added" /><CodeBlock.Line code="export default framework;" variant="highlighted" /></CodeBlock.Content></CodeBlock.Root>
</Story>
<Story name="Wrapped">
 <CodeBlock.Root class="w-full max-w-sm"><CodeBlock.Content wrap code="A long line of code or output wraps inside the available width so that the entire message remains visible without horizontal scrolling." /></CodeBlock.Root>
</Story>
<Story name="Styled Tokens">
 <CodeBlock.Root class="w-full max-w-xl"><CodeBlock.Content><CodeBlock.Line code={[{content: 'const ', class: 'text-violet-500'}, {content: 'message = '}, {content: '"Hello, Svelte"', class: 'text-green-600'}]} /></CodeBlock.Content></CodeBlock.Root>
</Story>
