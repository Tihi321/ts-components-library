<svelte:options tag={null} />

<script lang="ts">
  import { dispatchEvent } from "tsl-utils";
  import { createEventDispatcher } from "svelte";

  export let controlled: boolean = false;
  export let value: boolean = false;

  $: valueString = typeof value === "string" ? value === "true" : value;

  let component;

  const svelteDispatch = createEventDispatcher();

  const onChange = () => {
    if (!controlled) {
      value = !valueString;
    }
    svelteDispatch("change", {
      value: !valueString,
    });
    dispatchEvent({
      name: "change",
      params: !valueString,
      element: component,
    });
  };
</script>

<div class="container" on:click={onChange} bind:this={component}>
  <div class="toggle-line" />
  <div class="toggle-button" class:toggled={valueString} />
</div>

<style lang="scss">
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
    background-color: var(--ts-toggle-color, rgba(255, 152, 0, 1));
    position: relative;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    transform: translate(0);
    transition: background-color 0.2s ease-in-out, transform 0.2s ease-in-out;

    &.toggled {
      background-color: var(--ts-toggle-on-color, rgba(54, 54, 86, 1));
      transform: translate(20px);
    }
  }

  .toggle-line {
    background-color: var(--ts-toggle-color, rgba(255, 152, 0, 1));
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
