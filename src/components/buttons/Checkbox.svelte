<svelte:options tag={null} />

<script lang="ts">
  import { dispatchEvent } from "tsl-utils";
  import { createEventDispatcher } from "svelte";

  export let controlled: boolean = false;
  export let label: string;
  export let reverse: boolean = false;
  export let disabled: boolean = false;
  export let checked: boolean = false;

  $: controlledString = typeof controlled === "string" ? controlled === "true" : controlled;
  $: checkedString = typeof checked === "string" ? checked === "true" : checked;
  $: reverseString = typeof reverse === "string" ? reverse === "true" : reverse;
  $: disabledString = typeof disabled === "string" ? disabled === "true" : disabled;

  $: {
    console.log("controlledString", controlledString);
    console.log("disabledString", disabledString);
    console.log("reverseString", reverseString);
    console.log("checkedString", checkedString);
  }

  let component;

  const svelteDispatch = createEventDispatcher();

  const onChange = () => {
    if (disabledString) {
      return;
    }
    if (!controlledString) {
      checked = !checkedString;
    }
    svelteDispatch("change", {
      value: !checkedString,
    });
    dispatchEvent({
      name: "change",
      params: !checkedString,
      element: component,
    });
  };
</script>

<div class="container" class:reversed={reverseString} on:click={onChange} bind:this={component}>
  <input
    type="checkbox"
    class="checkbox"
    {checked}
    on:change={(event) => event.stopPropagation()}
  />
  <span class="checkmark" />
  {#if label}
    <div class="label" class:reversed={reverseString}>{label}</div>
  {/if}
</div>

<style lang="scss">
  @import "src/styles/all";
  .container {
    display: inline-flex;
    align-items: center;
    position: relative;
    cursor: pointer;
    user-select: none;
    flex-direction: row;

    &.reversed {
      flex-direction: row-reverse;
    }
  }

  .checkbox {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;

    &:checked ~ .checkmark {
      background-color: var(--ts-checkbox-checked-color, rgba(255, 152, 0, 1));
      border-color: var(--ts-checkbox-checked-border-color, rgba(233, 233, 233, 1));

      &:after {
        filter: blur(0);
      }
    }
  }

  .checkmark {
    position: relative;
    height: 14px;
    width: 14px;
    background-color: var(--ts-checkbox-checkmark-color, rgba(233, 233, 233, 1));
    border: 2px solid var(--ts-checkbox-checkmark-border-color, rgba(35, 39, 57, 1));
    transition: all 0.2s ease;

    &:after {
      content: "";
      position: absolute;
      filter: blur(5px);
      left: 4px;
      top: 1px;
      width: 4px;
      height: 8px;
      border: solid var(--ts-checkbox-check-color, rgba(255, 255, 255, 1));
      border-width: 0 1px 1px 0;
      transform: rotate(45deg);
      transition: filter 0.2s ease;
    }
  }

  .label {
    font-size: 14px;
    padding: 0 0 0 4px;

    &.reversed {
      padding: 0 4px 0;
    }
  }
</style>
