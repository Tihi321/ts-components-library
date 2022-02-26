<svelte:options tag={null} />

<script lang="ts">
  import { onDestroy, onMount, createEventDispatcher } from "svelte";
  import isEmpty from "lodash/isEmpty";
  import filter from "lodash/filter";
  import includes from "lodash/includes";
  import lowerCase from "lodash/lowerCase";
  import { dispatchEvent } from "tsl-utils";
  import type { TSelectedItems, TSelectedItem } from "../../types";

  const svelteDispatch = createEventDispatcher();

  export let open: boolean = false;
  export let highlight: string = undefined;
  export let selected: TSelectedItem = undefined;
  export let items: TSelectedItems = [];

  let search: string = "";
  $: useHighlight = !isEmpty(highlight);

  $: itemsArray = typeof items === "string" ? JSON.parse(items) : items;
  $: selectedbject = typeof selected === "string" ? JSON.parse(selected) : selected;

  $: filteredItems = filter(
    itemsArray,
    (item) => isEmpty(search) || includes(lowerCase(item.value as string), lowerCase(search))
  );

  let component;

  const onClose = () => {
    open = false;
    if (selected) {
      search = selected.value;
    }
  };

  const onOpen = () => {
    if (open) {
      if (selected) {
        search = selected.value;
      }
    } else {
      open = true;
    }
  };

  const onChange = (item: TSelectedItem) => {
    if (!selectedbject || selectedbject.id !== item.id) {
      svelteDispatch("change", item);
      dispatchEvent({
        name: "change",
        params: item,
        element: component,
      });
    }

    search = item.value;
    open = false;
  };

  onMount(() => {
    document.addEventListener("click", onClose);
  });

  onDestroy(() => {
    document.removeEventListener("click", onClose);
  });
</script>

<div class="container" bind:this={component} on:click|stopPropagation>
  <div class="title" on:click|stopPropagation={onOpen}>
    {#if useHighlight && !open}
      <div class="highlight text-shared">{highlight}</div>
    {/if}
    <input type="text" class:open class="search text-shared" bind:value={search} />
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
      {#each filteredItems as item}
        <li class="item" on:click|stopPropagation={() => onChange(item)}>
          {item.value}
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style lang="scss">
  .container {
    position: relative;
    color: var(--ts-select-color, rgba(255, 255, 255, 1));
    background-color: var(--ts-select-bg-color, rgba(54, 54, 86, 1));
  }

  .title {
    position: relative;
    width: 100%;
  }

  .text-shared {
    font-size: var(---ts-select-input-font-size, 14px);
    line-height: var(--ts-select-input-line-height, 18px);
    color: var(--ts-select-input-color, rgba(255, 255, 255, 1));
    box-sizing: border-box;
  }

  .highlight {
    padding: 10px 0 10px 16px;
    z-index: 1;
    pointer-events: none;
    position: absolute;
    color: transparent;
    background-color: rgba(162, 167, 172, 1);
    mix-blend-mode: darken;
    top: 0;
    left: 0;
    bottom: 1px;
    overflow: hidden;
  }

  .search {
    padding: 10px 16px;
    width: 100%;
    height: 100%;
    resize: none;
    border-width: 0;
    background-color: transparent;
    width: 100%;
    border-bottom: 1px solid var(--ts-select-border-color, rgba(255, 152, 0, 1));

    &.open {
      border-bottom: 1px solid var(--ts-select-border-open-color, rgba(255, 0, 0, 1));
    }

    &:focus,
    &:active {
      outline: none;
    }
  }

  .arrow {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    right: 18px;
    width: 12px;
    height: 10px;
    top: calc(50% - 6px);
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
    margin: 0;
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
