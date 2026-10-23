<script lang="ts">
  import { useHighlightedCode } from "./use-highlighted-code.svelte.js";
  import * as CodeBlock from "../../components/code-block/index.js";
  const code = 'const greeting = "Hello, Svelte";\nconsole.log(greeting);';
  const lines = useHighlightedCode(() => code, () => "typescript");
</script>

<CodeBlock.Root class="w-full max-w-xl">
  <CodeBlock.Header><CodeBlock.Title>greeting.ts</CodeBlock.Title></CodeBlock.Header>
  <CodeBlock.Content lineNumbers>
    {#each lines.current as line, index (index)}
      <CodeBlock.Line code={line} />
    {/each}
  </CodeBlock.Content>
</CodeBlock.Root>
