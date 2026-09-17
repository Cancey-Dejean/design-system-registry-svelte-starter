<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { Button } from "$lib/components/ui/button";

  const { Story } = defineMeta({
    title: "Components/Button",
    component: Button,
    tags: ["autodocs"],
    argTypes: {
      variant: {
        control: { type: "select" },
        options: ["default", "outline", "secondary", "ghost", "destructive", "link"],
      },
      size: {
        control: { type: "select" },
        options: ["default", "xs", "sm", "lg", "icon"],
      },
    },
  });
</script>

<Story name="Default">Button</Story>
<Story name="Outline" args={{ variant: "outline" }}>Outline</Story>
<Story name="Destructive" args={{ variant: "destructive" }}>Delete</Story>
