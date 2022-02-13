<svelte:options tag={null} />

<script lang="ts">
  import { onDestroy, onMount, createEventDispatcher } from "svelte";
  import { dispatchEvent, useAvoidElementCallback } from "tsl-utils";
  import type { TDropdownItems, TDropdownItem } from "../../types";

  const svelteDispatch = createEventDispatcher();

  export let open: boolean = false;
  export let selected: TDropdownItem = undefined;
  export let items: TDropdownItems = [];

  $: itemsArray = typeof items === "string" ? JSON.parse(items) : items;
  $: selectedbject = typeof selected === "string" ? JSON.parse(selected) : selected;

  const slotName = "dropdown-slot";
  let component;

  const { onEventCallback } = useAvoidElementCallback({
    datasetName: "dropdown",
    slotName,
    callback: () => {
      if (open) {
        open = false;
      }
    },
  });

  const onOpen = () => {
    open = !open;
  };

  const onChange = (item: TDropdownItem) => {
    if (!selectedbject || selectedbject.id !== item.id) {
      svelteDispatch("change", item);
      dispatchEvent({
        name: "change",
        params: item,
        element: component,
      });
    }

    open = false;
  };

  onMount(() => {
    document.addEventListener("click", onEventCallback);
  });

  onDestroy(() => {
    document.removeEventListener("click", onEventCallback);
  });
</script>

<div class="container" class:open data-dropdown={slotName} bind:this={component}>
  <div class="title" on:click={onOpen}>
    <div class="selected">
      {#if selectedbject}
        {selectedbject.value}
      {:else}
        -
      {/if}
    </div>
    <div class="arrow" class:open>
      <svg
        class="arrow-icon"
        width="12"
        height="13"
        view-box="0 0 12 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          class="arrow-icon-path"
          d="M5.99996 0.500001L1.04907e-06 12.5L12 12.5L5.99996 0.500001Z"
          fill="#F7FAFD"
        />
      </svg>
    </div>
  </div>
  {#if open}
    <ul class="items">
      {#each itemsArray as item}
        <li class="item" on:click={() => onChange(item)}>
          {item.value}
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style lang="scss">
  @import "src/styles/all";
  .container {
    position: relative;
    color: var(--ts-select-color, rgba(35, 39, 57, 1));
    background-color: var(--ts-select-bg-color, rgba(255, 255, 255, 1));
    width: 100%;
    border: 1px solid var(--ts-select-border-color, rgba(35, 39, 57, 1));
    border-radius: 5px;

    &.open {
      z-index: 1;
    }
  }

  .title {
    font-size: 14px;
    line-height: 18px;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }

  .arrow {
    display: flex;
    align-items: center;
    width: 12px;
    height: 10px;
    margin-left: 8px;
    transition: transform 0.2s ease;
    &.open {
      transform: rotate(180deg);
    }

    .arrow-icon {
      width: 100%;
      height: 100%;
    }
    .arrow-icon-path {
      fill: var(--ts-select-icon-color, rgba(35, 39, 57, 1));
    }
  }

  .items {
    @extend %reset-list;
    position: absolute;
    margin: 4px 0 0 0;
    z-index: 1;
    left: 0;
    right: 0;
    max-height: 250px;
    overflow: auto;
    display: flex;
    flex-direction: column;
    background-color: inherit;
    border-radius: inherit;
    border: 1px solid var(--ts-select-border-color, rgba(35, 39, 57, 1));
  }

  .item {
    font-size: 14px;
    line-height: 18px;
    cursor: pointer;
    padding: 10px 20px;
    text-align: left;

    &:hover {
      background-color: var(--ts-select-hover-color, rgba(3, 169, 244, 1));
    }
  }
</style>
