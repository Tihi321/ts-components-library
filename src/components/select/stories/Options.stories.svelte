<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Options from "../Options.svelte";

  const items = [
    {
      id: "1",
      value: "Test1",
    },
    {
      id: "2",
      value: "Test2",
    },
    {
      id: "3",
      value: "Test3",
    },
  ];

  let selected = undefined;
</script>

<!-- More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export -->
<!-- More on argTypes: https://storybook.js.org/docs/svelte/api/argtypes -->
<Meta
  title="Select/Options"
  component={Options}
  argTypes={{
    type: {
      defaultValue: "row",
      options: ["row", "column"],
      control: { type: "radio" },
    },
  }}
/>

<!-- More on component templates: https://storybook.js.org/docs/svelte/writing-stories/introduction#using-args -->
<Template let:args>
  <div class="container">
    <Options
      {selected}
      {items}
      {...args}
      on:change={(item) => {
        selected = item.detail;
      }}
    />
  </div>
</Template>

<!-- More on args: https://storybook.js.org/docs/svelte/writing-stories/args -->
<Story name="Default" />

<style lang="scss">
  @import "src/styles/all";

  .container {
    margin: 10px;
  }
</style>
