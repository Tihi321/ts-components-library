<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Input from "../Input.svelte";
</script>

<!-- More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export -->
<!-- More on argTypes: https://storybook.js.org/docs/svelte/api/argtypes -->
<Meta
  title="Buttons/Input"
  component={Input}
  argTypes={{
    controlled: { defaultValue: false, control: "boolean" },
    disabled: { defaultValue: false, control: "boolean" },
  }}
/>

<!-- More on component templates: https://storybook.js.org/docs/svelte/writing-stories/introduction#using-args -->
<Template let:args>
  <div class="container">
    <Input {...args} />
  </div>
</Template>

<Story
  name="Text"
  args={{
    value: "This is text",
    type: "text",
  }}
/>

<Story
  name="Number"
  args={{
    value: 10,
    max: 20,
    min: 5,
    type: "number",
    suffix: "°C",
  }}
/>

<Story
  name="No Min/Max"
  args={{
    value: 10,
    type: "number",
    suffix: "°C",
  }}
/>

<style lang="scss">
  @import "src/styles/all";

  .container {
    padding: 10px;
    box-sizing: border-box;
    width: 100%;

    color: #ffffff;
  }
</style>
