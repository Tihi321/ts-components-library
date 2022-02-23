<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Accordion from "../Accordion.svelte";
</script>

<!-- More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export -->
<!-- More on argTypes: https://storybook.js.org/docs/svelte/api/argtypes -->
<Meta
  title="Common/Accordion"
  component={Accordion}
  argTypes={{
    open: { defaultValue: false, control: "boolean" },
    title: {
      defaultValue: "This is Title",
      control: { type: "text" },
    },
  }}
/>

<!-- More on component templates: https://storybook.js.org/docs/svelte/writing-stories/introduction#using-args -->
<Template let:args>
  <div class="container">
    <Accordion {...args}>
      <span slot="title">
        {args.title}
      </span>

      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam amet fuga obcaecati ex
      expedita magni eius repudiandae perspiciatis? Numquam reprehenderit esse animi provident
      dignissimos facilis iure rem, dolor commodi rerum.
    </Accordion>
  </div>
</Template>

<!-- More on args: https://storybook.js.org/docs/svelte/writing-stories/args -->
<Story name="Default" />

<style lang="scss">
  .container {
    width: 100%;
    border: 1px solid white;
  }
</style>
