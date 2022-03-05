<svelte:options tag={null} />

<script lang="ts">
  import { onDestroy, onMount, createEventDispatcher } from "svelte";
  import { dispatchEvent } from "tsl-utils";
  import type { TSelectedItems, TSelectedItem } from "../../types";

  const svelteDispatch = createEventDispatcher();

  export let open: boolean = false;
  export let selected: TSelectedItem = undefined;
  export let items: TSelectedItems = [];

  $: itemsArray = typeof items === "string" ? JSON.parse(items) : items;
  $: selectedbject = typeof selected === "string" ? JSON.parse(selected) : selected;

  let containerComponent;

  $: {
    if (open && selected) {
      const scrollToElement = containerComponent.querySelector(
        `#dropdown-item-id-${CSS.escape(selected.id)}`
      ) as Element;
      scrollToElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  const onClose = () => {
    open = false;
  };

  const onOpen = () => {
    open = !open;
  };

  const onChange = (item: TSelectedItem) => {
    if (!selectedbject || selectedbject.id !== item.id) {
      svelteDispatch("change", item);
      dispatchEvent({
        name: "change",
        params: item,
        element: containerComponent,
      });
    }

    open = false;
  };

  onMount(() => {
    document.addEventListener("click", onClose);
  });

  onDestroy(() => {
    document.removeEventListener("click", onClose);
  });
</script>

<div class="container" class:open bind:this={containerComponent} on:click|stopPropagation>
  <div class="title" on:click|stopPropagation={onOpen}>
    {#if selectedbject}
      {selectedbject.value}
    {:else}
      -
    {/if}
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
  <ul class="items" class:open>
    {#each itemsArray as item}
      <li
        class="item"
        on:click|stopPropagation={() => onChange(item)}
        id={`dropdown-item-id-${item.id}`}
        class:selected={selected && selected.id === item.id}
      >
        {item.value}
      </li>
    {/each}
  </ul>
</div>

<style lang="scss">
  .container {
    position: relative;
    color: var(--ts-select-color, rgba(255, 255, 255, 1));
    background-color: var(--ts-select-bg-color, rgba(54, 54, 86, 1));
    width: 100%;
    border-bottom: 1px solid var(--ts-select-border-color, rgba(255, 152, 0, 1));

    &.open {
      border-bottom: 1px solid var(--ts-select-border-open-color, rgba(255, 0, 0, 1));
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
      fill: var(--ts-select-icon-color, var(--ts-select-color, rgba(255, 152, 0, 1)));
    }
  }

  .items {
    list-style: none;
    padding-left: 0;
    position: absolute;
    margin: 1px 0 0 0;
    z-index: 1;
    left: 0;
    right: 0;
    max-height: 250px;
    overflow: auto;
    display: flex;
    flex-direction: column;
    background-color: inherit;
    border-radius: inherit;
    border-bottom: 1px solid
      var(--ts-select-border-color, var(--ts-select-color, rgba(255, 152, 0, 1)));

    visibility: hidden;
    opacity: 0;
    pointer-events: none;

    &.open {
      visibility: visible;
      opacity: 1;
      pointer-events: all;
    }
  }

  .item {
    font-size: 14px;
    line-height: 18px;
    cursor: pointer;
    padding: 10px 20px;
    text-align: left;

    &:hover,
    &.selected {
      background-color: var(--ts-select-hover-color, rgba(3, 169, 244, 1));
    }
  }
</style>
