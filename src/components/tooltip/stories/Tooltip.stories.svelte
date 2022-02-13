<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Tooltip from "../Tooltip.svelte";
  import { tooltipPlacement, tooltipTrigger } from "../../../constants";
</script>

<!-- More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export -->
<!-- More on argTypes: https://storybook.js.org/docs/svelte/api/argtypes -->
<Meta
  title="Common/Tooltip"
  component={Tooltip}
  argTypes={{
    tooltip: {
      defaultValue: "This is tooltip",
      control: { type: "text" },
    },
    hideArrow: { defaultValue: false, control: "boolean" },
    placement: {
      defaultValue: tooltipPlacement.Top,
      options: Object.values(tooltipPlacement),
      control: { type: "radio" },
    },
    trigger: {
      defaultValue: tooltipTrigger.Hover,
      options: Object.values(tooltipTrigger),
      control: { type: "radio" },
    },
  }}
/>

<!-- More on component templates: https://storybook.js.org/docs/svelte/writing-stories/introduction#using-args -->
<Template let:args>
  <div class="container">
    <Tooltip {...args}>
      <div class="info">Info</div>
      <span slot="tooltip">
        {args.tooltip}
      </span>
    </Tooltip>
  </div>
</Template>

<!-- More on args: https://storybook.js.org/docs/svelte/writing-stories/args -->
<Story name="Default" />

<style lang="scss">
  .container {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000000;
  }

  .info {
    color: #ffffff;
  }
</style>
