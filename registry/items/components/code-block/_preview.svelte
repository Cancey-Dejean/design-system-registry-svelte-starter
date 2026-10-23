<script lang="ts">
 import * as CodeBlock from "./index.js";
 const code = 'import { mount } from "svelte";\nimport App from "./App.svelte";\n\nmount(App, { target: document.body });';
</script>

<CodeBlock.Root class="w-full max-w-xl">
 <CodeBlock.Header>
  <CodeBlock.Title>main.ts</CodeBlock.Title>
  <CodeBlock.Actions><CodeBlock.CopyButton value={code} /></CodeBlock.Actions>
 </CodeBlock.Header>
 <CodeBlock.Content {code} lineNumbers />
 <CodeBlock.Footer>Svelte 5 · TypeScript</CodeBlock.Footer>
</CodeBlock.Root>
