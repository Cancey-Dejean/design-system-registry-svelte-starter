<script module lang="ts">
 import { defineMeta } from "@storybook/addon-svelte-csf";
 import * as Trace from "../index.js";
 import SearchIcon from "@lucide/svelte/icons/search";
 import TerminalIcon from "@lucide/svelte/icons/terminal";
 const { Story } = defineMeta({ title: "Components/Trace", tags: ["autodocs"], parameters: { centered: true } });
</script>

<Story name="Default">
 <Trace.Root class="w-full max-w-md">
  <Trace.Line><Trace.Icon><SearchIcon /></Trace.Icon><Trace.Title>Searched project configuration</Trace.Title><Trace.Description>120 ms</Trace.Description></Trace.Line>
  <Trace.Line><Trace.Icon><TerminalIcon /></Trace.Icon><Trace.Title>Ran node --version</Trace.Title><Trace.Description>24.18.0</Trace.Description></Trace.Line>
 </Trace.Root>
</Story>
<Story name="Statuses">
 <Trace.Root class="w-full max-w-md">
  <Trace.Line><Trace.Title>Read configuration</Trace.Title><Trace.Description>Complete</Trace.Description></Trace.Line>
  <Trace.Line status="running"><Trace.Title>Building project</Trace.Title><Trace.Description>Running</Trace.Description></Trace.Line>
  <Trace.Line status="pending"><Trace.Title>Publish artifacts</Trace.Title><Trace.Description>Pending</Trace.Description></Trace.Line>
  <Trace.Line status="error"><Trace.Title>Deployment failed</Trace.Title><Trace.Description>Error</Trace.Description></Trace.Line>
 </Trace.Root>
</Story>
<Story name="Expandable Details">
 <Trace.Root class="w-full max-w-md">
  <Trace.Collapsible open>
   <Trace.CollapsibleTrigger><Trace.Line><Trace.Icon><TerminalIcon /></Trace.Icon><Trace.Title>Ran node --version</Trace.Title></Trace.Line></Trace.CollapsibleTrigger>
   <Trace.CollapsibleContent>v24.18.0</Trace.CollapsibleContent>
  </Trace.Collapsible>
  <Trace.Collapsible>
   <Trace.CollapsibleTrigger><Trace.Line status="error"><Trace.Title>Build failed</Trace.Title></Trace.Line></Trace.CollapsibleTrigger>
   <Trace.CollapsibleContent>Missing required environment variable.</Trace.CollapsibleContent>
  </Trace.Collapsible>
 </Trace.Root>
</Story>
<Story name="Long Content">
 <Trace.Root class="w-full max-w-xs">
  <Trace.Line><Trace.Title>A very long task title that truncates within the available width</Trace.Title><Trace.Description>1.2 s</Trace.Description></Trace.Line>
  <Trace.Collapsible open><Trace.CollapsibleTrigger><Trace.Line><Trace.Title>View output</Trace.Title></Trace.Line></Trace.CollapsibleTrigger><Trace.CollapsibleContent>Long supporting output wraps within the available space, keeping the trace readable in narrow layouts.</Trace.CollapsibleContent></Trace.Collapsible>
 </Trace.Root>
</Story>
