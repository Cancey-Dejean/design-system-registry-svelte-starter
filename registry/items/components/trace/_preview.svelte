<script lang="ts">
 import * as Trace from "./index.js";
 import SearchIcon from "@lucide/svelte/icons/search";
 import TerminalIcon from "@lucide/svelte/icons/terminal";
</script>

<Trace.Root class="w-full max-w-md">
 <Trace.Line><Trace.Icon><SearchIcon /></Trace.Icon><Trace.Title>Searched project configuration</Trace.Title></Trace.Line>
 <Trace.Collapsible open>
  <Trace.CollapsibleTrigger><Trace.Line><Trace.Icon><TerminalIcon /></Trace.Icon><Trace.Title>Ran node --version</Trace.Title></Trace.Line></Trace.CollapsibleTrigger>
  <Trace.CollapsibleContent>v24.18.0</Trace.CollapsibleContent>
 </Trace.Collapsible>
</Trace.Root>
