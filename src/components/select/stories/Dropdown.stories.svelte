<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Dropdown from "../Dropdown.svelte";
  import range from "lodash/range";
  import map from "lodash/map";

  const items = map(range(20), (index) => ({
    id: `Test${index}`,
    value: `Test${index}`,
  }));

  let selected = undefined;
</script>

<!-- More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export -->
<!-- More on argTypes: https://storybook.js.org/docs/svelte/api/argtypes -->
<Meta
  title="Components/Select/Dropdown"
  component={Dropdown}
  argTypes={{
    scroll: {
      defaultValue: true,
      control: { type: "boolean" },
    },
  }}
/>

<!-- More on component templates: https://storybook.js.org/docs/svelte/writing-stories/introduction#using-args -->
<Template let:args>
  <div class="container">
    <Dropdown
      {selected}
      {items}
      scroll={args.scroll}
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
