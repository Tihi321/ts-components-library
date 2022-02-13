<svelte:options tag="ts-dropdown" />

<script lang="ts">
  import { onDestroy, onMount, createEventDispatcher } from "svelte";
  import { dispatchEvent } from "tsl-utils";
  import { get_current_component } from "svelte/internal";
  import { useAvoidElementCallback } from "../../hooks";
  import type { TDropdownItems, TDropdownItem } from "../../types";

  const component = get_current_component();
  const svelteDispatch = createEventDispatcher();

  const slotName = "dropdown-slot";

  export let open: boolean = false;
  export let selected: TDropdownItem = undefined;
  export let items: TDropdownItems = [];

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
    if (!selected || selected.id !== item.id) {
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

<div class="container" class:open data-dropdown={slotName}>
  <div class="title" on:click={onOpen}>
    <div class="selected">
      {#if selected}
        {selected.value}
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
      {#each items as item}
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
    color: $select-color;
    background-color: $select-bg-color;
    width: 100%;
    border: 1px solid $select-border-color;
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
      fill: $select-icon-color;
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
    border: 1px solid $select-border-color;
  }

  .item {
    font-size: 14px;
    line-height: 18px;
    cursor: pointer;
    padding: 10px 20px;
    text-align: left;

    &:hover {
      background-color: $select-hover-color;
    }
  }
</style>
