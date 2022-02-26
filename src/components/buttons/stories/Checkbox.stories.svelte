<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Checkbox from "../Checkbox.svelte";

  let checked = true;
</script>

<!-- More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export -->
<!-- More on argTypes: https://storybook.js.org/docs/svelte/api/argtypes -->
<Meta
  title="Components/Buttons/Checkbox"
  component={Checkbox}
  argTypes={{
    checked: { defaultValue: false, control: "boolean" },
    controlled: { defaultValue: false, control: "boolean" },
    reverse: { defaultValue: false, control: "boolean" },
    disabled: { defaultValue: false, control: "boolean" },
    label: {
      defaultValue: "This is Label",
      control: { type: "text" },
    },
  }}
/>

<!-- More on component templates: https://storybook.js.org/docs/svelte/writing-stories/introduction#using-args -->
<Template let:args>
  <div class="container">
    <Checkbox
      on:change={(event) => {
        checked = event.detail.value;
      }}
      {checked}
      {...args}
    >
      <span slot="label">
        {args.label}
      </span>
    </Checkbox>
  </div>
</Template>

<!-- More on args: https://storybook.js.org/docs/svelte/writing-stories/args -->
<Story name="Default" />

<style lang="scss">
  @import "src/styles/all";

  .container {
    display: inline-block;
    margin: 10px;

    color: #ffffff;
  }
</style>
