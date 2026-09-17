<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import AnnouncementBar from "../announcement-bar.svelte";

  const { Story } = defineMeta({
    title: "Blocks/AnnouncementBar",
    component: AnnouncementBar,
    tags: ["autodocs"],
  });
</script>

<Story
  name="Default"
  args={{ message: "We just shipped a new design system.", href: "/docs/changelog" }}
/>
<Story name="No link" args={{ message: "Scheduled maintenance this weekend." }} />
