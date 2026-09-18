<script lang="ts">
  import CheckCircle2Icon from "@lucide/svelte/icons/check-circle-2";
  import * as Alert from "$registry/items/components/alert/index.js";
</script>

<Alert.Root class="w-full max-w-xl">
  <CheckCircle2Icon />
  <Alert.Title>Success! Your changes have been saved</Alert.Title>
  <Alert.Description
    >This is an alert with icon, title and description.</Alert.Description
  >
</Alert.Root>
