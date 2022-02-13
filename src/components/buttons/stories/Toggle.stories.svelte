<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Toggle from "../Toggle.svelte";

  let toggled = true;
</script>

<!-- More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export -->
<!-- More on argTypes: https://storybook.js.org/docs/svelte/api/argtypes -->
<Meta title="Buttons/Toggle" component={Toggle} />

<!-- More on component templates: https://storybook.js.org/docs/svelte/writing-stories/introduction#using-args -->
<Template let:args>
  <div class="container">
    <Toggle
      on:change={(event) => {
        toggled = event.detail.value;
      }}
      value={toggled}
      {...args}
    />
  </div>
</Template>

<!-- More on args: https://storybook.js.org/docs/svelte/writing-stories/args -->
<Story name="Default" />

<style lang="scss">
  @import "src/styles/all";

  .container {
    display: inline-block;
    margin: 10px;
  }
</style>
