<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { Badge } from "../index.js";

  const { Story } = defineMeta({
    title: "Components/Badge",
    component: Badge,
    tags: ["autodocs"],
    argTypes: {
      variant: {
        control: { type: "select" },
        options: [
          "default",
          "secondary",
          "destructive",
          "outline",
          "ghost",
          "link",
        ],
      },
    },
  });
</script>

<Story name="Default">Default</Story>
<Story name="Secondary" args={{ variant: "secondary" }}>Secondary</Story>
<Story name="Outline" args={{ variant: "outline" }}>Outline</Story>
