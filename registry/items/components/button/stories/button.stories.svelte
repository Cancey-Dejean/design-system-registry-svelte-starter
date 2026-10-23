<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { fn } from "storybook/test";
  import { Button } from "$registry/items/components/button";
  import { Settings } from "@lucide/svelte";

  import { BUTTON_SIZES, BUTTON_VARIANTS } from "../button.variants";

  const { Story } = defineMeta({
    title: "Components/Button",
    component: Button,
    argTypes: {
      variant: {
        control: "select",
        description: "The visual style variant of the button",
        options: BUTTON_VARIANTS,
        table: {
          defaultValue: { summary: "default" },
        },
      },
      size: {
        control: "select",
        description: "The size of the button",
        options: BUTTON_SIZES.filter((size) => !size.startsWith("icon")),
        as: { control: false },
        icon: { control: false },
      },
      disabled: {
        control: "boolean",
        description: "Whether the button is disabled",
        table: {
          defaultValue: { summary: "false" },
        },
      },
      href: {
        control: "text",
        description:
          "If provided, renders as an anchor tag instead of a button",
        table: {
          disable: true,
        },
      },
      type: {
        control: "select",
        description:
          "The button type attribute (only applies when not using href)",
        table: {
          defaultValue: { summary: "button" },
        },
      },
      ref: {
        control: false,
        description: "The ref of the button",
      },
      newTab: {
        control: "boolean",
        description: "Whether the link should open in a new tab",
        table: {
          disable: true,
        },
      },
    },
    args: {
      variant: "default",
      size: "default",
      disabled: false,
      type: "button",
      onclick: fn(),
    },
    parameters: { centered: true },
  });
</script>

<Story name="Default" args={{ variant: "default" }}>

    Button

</Story>

<Story name="Disabled" args={{ disabled: true }}>

    Disabled

</Story>

<Story name="Icon" args={{ size: "icon", variant: "default" }}>

    <Settings />

</Story>

<Story
  name="Link"
  args={{ variant: "default", href: "https://example.com", newTab: true }}
  argTypes={{
    href: {
      table: {
        disable: false,
      },
    },
    newTab: {
      table: {
        disable: false,
      },
    },
  }}
>

    Link

</Story>

<Story
  name="Link Text"
  args={{ href: "https://example.com", variant: "link", newTab: true }}
  argTypes={{
    href: {
      table: {
        disable: false,
      },
    },
    newTab: {
      table: {
        disable: false,
      },
    },
  }}
>

    Link Text

</Story>

<Story name="With Icon" args={{ variant: "default" }}>

    <Settings />
    Button with Icon

</Story>
