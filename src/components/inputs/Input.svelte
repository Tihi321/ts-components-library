<svelte:options tag={null} />

<script lang="ts">
  import { dispatchEvent } from "tsl-utils";
  import { createEventDispatcher } from "svelte";

  export let value: string;
  export let type: string = "text";
  export let suffix: string;
  export let step: string | number = 1;
  export let controlled: boolean | string = false;
  export let disabled: boolean | string = false;
  export let border: boolean | string = false;
  export let min: string | number = "infinity";
  export let max: string | number = "infinity";

  const getBooleanFromString = (valueString: string | boolean) =>
    typeof valueString === "string" ? valueString === "true" : valueString;

  $: controlledString = getBooleanFromString(controlled);
  $: disabledString = getBooleanFromString(disabled);
  $: borderdString = getBooleanFromString(border);
  $: stepNumber = typeof step === "string" ? Number(step) : step;

  let component;
  let input;

  const svelteDispatch = createEventDispatcher();

  const onChange = (inputValue) => {
    if (disabledString) {
      return;
    }
    if (!controlledString) {
      value = inputValue;
    }
    svelteDispatch("change", {
      value: inputValue,
    });
    dispatchEvent({
      name: "change",
      params: inputValue,
      element: component,
    });
  };

  const onInput = (event) => {
    onChange(event.target.value);
  };

  const onUpNumberClick = () => {
    let inputValue = Number(input.value);

    const returnNumber = inputValue + stepNumber;

    if (isNaN(Number(max))) {
      onChange(returnNumber);
    } else if (returnNumber <= Number(max)) {
      onChange(returnNumber);
    }
  };

  const onDownNumberClick = () => {
    let inputValue = Number(input.value);

    const returnNumber = inputValue - stepNumber;

    if (isNaN(Number(min))) {
      onChange(returnNumber);
    } else if (returnNumber >= Number(min)) {
      onChange(returnNumber);
    }
  };
</script>

<div class="container" bind:this={component}>
  {#if suffix}
    <div class="suffix-input-container text-shared">
      <div class="suffix-input-text">{value}</div>
      {suffix}
    </div>
  {/if}
  <input
    bind:this={input}
    {type}
    {min}
    {max}
    {step}
    {value}
    disabled={disabledString}
    class="text-shared input-shared"
    class:text-input={type === "text"}
    class:number-input={type === "number"}
    class:border={borderdString}
    on:input={onInput}
  />
  {#if type === "number"}
    <div class="arrow-button-wrapper">
      <div class="arrow-buttons">
        <button class="arrow-button" on:click={onUpNumberClick}>
          <svg
            width="12"
            height="13"
            viewBox="0 0 12 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="arrow-icon"
          >
            <path
              d="M5.99996 0.500001L1.04907e-06 12.5L12 12.5L5.99996 0.500001Z"
              fill="#F7FAFD"
              class="arrow-icon-path"
            />
          </svg>
        </button>
        <button class="arrow-button rotated" on:click={onDownNumberClick}>
          <svg
            width="12"
            height="13"
            viewBox="0 0 12 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="arrow-icon"
          >
            <path
              d="M5.99996 0.500001L1.04907e-06 12.5L12 12.5L5.99996 0.500001Z"
              fill="#F7FAFD"
              class="arrow-icon-path"
            />
          </svg>
        </button>
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  @import "src/styles/all";
  .container {
    display: block;
    position: relative;
    width: 100%;
    font-family: var(--ts-simple-input-font-family, Arial, Helvetica, sans-serif);
  }

  .text-shared {
    font-size: var(--ts-simple-input-font-size, 14px);
    line-height: var(--ts-simple-input-line-height, 18px);
    color: var(--ts-simple-input-color, rgba(255, 255, 255, 1));
    box-sizing: border-box;
  }

  .input-shared {
    display: block;
    width: 100%;
    resize: none;
    background-color: var(--ts-simple-input-bg-color, rgba(54, 54, 86, 1));
    border-width: 0;
    box-shadow: 0 -1px 0 0 var(--ts-simple-input-border-color, rgba(255, 152, 0, 1)) inset;

    &.border {
      box-shadow: 0 0 0 1px var(--ts-simple-input-border-color, rgba(255, 152, 0, 1)) inset;
    }

    &:focus,
    &:active {
      box-shadow: 0 -1px 0 0 var(--ts-simple-input-border-active-color, rgba(255, 0, 0, 1)) inset;
      outline: none;

      &.border {
        box-shadow: 0 0 0 1px var(--ts-simple-input-border-active-color, rgba(255, 0, 0, 1)) inset;
      }
    }

    &:disabled {
      cursor: no-drop;
      color: var(--ts-simple-input-input-border-disabled-color, rgba(128, 128, 128, 1));
      box-shadow: 0 -1px 0 0 var(
          --ts-simple-input-input-border-disabled-border-color,
          rgba(169, 169, 169, 1)
        ) inset;

      &.border {
        box-shadow: 0 0 0 1px
          var(--ts-simple-input-input-border-disabled-border-color, rgba(169, 169, 169, 1)) inset;
      }
    }
  }

  .text-input {
    padding: 10px 16px;
  }

  .number-input {
    padding: 10px 36px 10px 16px;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  .suffix-input-container {
    padding: 10px 36px 10px 16px;
    display: flex;
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    border-bottom: 1px solid transparent;
    overflow: hidden;
  }

  .suffix-input-text {
    opacity: 0;
    display: inline-block;
  }

  .arrow-button-wrapper {
    display: flex;
    justify-content: center;
    position: absolute;
    background-color: var(--ts-simple-input-bg-color, rgba(54, 54, 86, 1));
    right: 1px;
    top: 1px;
    bottom: 1px;
    width: 36px;
  }

  .arrow-buttons {
    display: inline-flex;
    justify-content: center;
    flex-direction: column;
    height: 100%;
  }

  .arrow-button {
    width: 14px;
    background: transparent;
    display: inline-flex;
    padding: 3px;
    margin: 0;
    border: none;
    cursor: pointer;
    outline: none;

    :focus,
    :active {
      outline: none;
      border: none;
    }

    &.rotated {
      transform: rotate(180deg);
    }
  }

  .arrow-icon-path {
    fill: var(--ts-simple-input-arrow-color, rgba(255, 152, 0, 1));
  }
</style>
