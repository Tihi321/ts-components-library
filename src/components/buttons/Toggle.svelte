<svelte:options tag={null} />

<script lang="ts">
  import { dispatchEvent } from "tsl-utils";
  import { createEventDispatcher } from "svelte";

  export let controlled: boolean = false;
  export let value: boolean = false;

  let component;

  const svelteDispatch = createEventDispatcher();

  const onChange = () => {
    if (!controlled) {
      value = !value;
    }
    svelteDispatch("change", {
      value: !value,
    });
    dispatchEvent({
      name: "change",
      params: !value,
      element: component,
    });
  };
</script>

<div class="container" on:click={onChange} bind:this={component}>
  <div class="toggle-line" />
  <div class="toggle-button" class:toggled={value} />
</div>

<style lang="scss">
  @import "src/styles/all";
  .container {
    margin: 4px;
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    width: 38px;
    height: 22px;
  }
  .toggle-button {
    background-color: $toggle-color;
    position: relative;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    transform: translate(0);
    transition: background-color 0.2s ease-in-out, transform 0.2s ease-in-out;

    &.toggled {
      background-color: $toggle-on-color;
      transform: translate(20px);
    }
  }

  .toggle-line {
    background-color: $toggle-color;
    transition: background-color 0.2s ease-in-out;
    height: 6px;
    border-radius: 3px;
    width: 100%;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(0, -50%);
  }
</style>
