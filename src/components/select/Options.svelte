<svelte:options tag={null} />

<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { dispatchEvent } from "tsl-utils";

  import type { TSelectedItem, TSelectedItems } from "../../types";

  export let type: string = "row";
  export let items: TSelectedItems = [];
  export let selected: TSelectedItem = undefined;

  $: itemsArray = typeof items === "string" ? JSON.parse(items) : items;
  $: selectedbject = typeof selected === "string" ? JSON.parse(selected) : selected;

  let component;

  const svelteDispatch = createEventDispatcher();

  const onChange = (item: TSelectedItem) => {
    if (!selected || selected.id !== item.id) {
      svelteDispatch("change", item);
      dispatchEvent({
        name: "change",
        params: item,
        element: component,
      });
    }
  };
</script>

<ul class="select" bind:this={component} class:column={type === "column"}>
  {#each itemsArray as item}
    <li
      on:click|stopPropagation={() => onChange(item)}
      class="option"
      class:selected={selectedbject && item.id === selectedbject.id}
    >
      {item.value}
    </li>
  {/each}
</ul>

<style lang="scss">
  .select {
    list-style: none;
    padding-left: 0;
    display: flex;
    align-items: center;
    margin: 0;

    li:not(:first-child) {
      margin-left: var(--ts-options-gap, 10px);
    }

    &.column {
      flex-direction: column;

      li:not(:first-child) {
        margin-left: 0;
        margin-top: var(--ts-options-gap, 10px);
      }

      .option {
        width: 100%;
      }
    }
  }

  .option {
    flex: 1;
    color: var(--ts-options-color, rgba(35, 39, 57, 1));
    transition: 0.2s color ease;
    font-weight: bold;
    cursor: pointer;
    text-align: center;
    padding: var(--ts-options-padding, 5px 8px);
    background-color: var(--ts-options-bg-color, rgba(255, 255, 255, 1));
    border-radius: var(--ts-options-border-radius, 5px);
    border-color: var(--ts-options-border-color, rgba(35, 39, 57, 1));
    border-width: var(--ts-options-border-width, 1px);
    border-style: var(--ts-options-border-style, solid);

    &:hover {
      color: var(--ts-options-hover-color, rgba(3, 169, 244, 1));
      border-color: var(--ts-options-hover-color, rgba(3, 169, 244, 1));
    }

    &:disabled {
      opacity: 0.5;
      cursor: default;
    }
  }

  .selected {
    color: var(--ts-options-active-color, rgba(255, 255, 255, 1));
    background-color: var(--ts-options-active-bg-color, rgba(35, 39, 57, 1));
    border-color: var(--ts-options-active-border-color, rgba(35, 39, 57, 1));

    &:hover {
      border-color: var(--ts-options-active-hover-border-color, rgba(35, 39, 57, 1));
    }
  }
</style>
