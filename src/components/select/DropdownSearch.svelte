<svelte:options tag={null} />

<script lang="ts">
  import { onDestroy, onMount, createEventDispatcher } from "svelte";
  import isEmpty from "lodash/isEmpty";
  import filter from "lodash/filter";
  import replace from "lodash/replace";
  import includes from "lodash/includes";
  import lowerCase from "lodash/lowerCase";
  import { dispatchEvent } from "tsl-utils";
  import type { TSelectedItems, TSelectedItem } from "../../types";

  const svelteDispatch = createEventDispatcher();

  export let open: boolean = false;
  export let highlight: string = "";
  export let selected: TSelectedItem = undefined;
  export let items: TSelectedItems = [];

  let search: string = "";
  let enabledSearch: boolean = false;

  $: searchWithoutHighlight = selected ? replace(selected.value, highlight, "") : selected;

  $: itemsArray = typeof items === "string" ? JSON.parse(items) : items;
  $: selectedbject = typeof selected === "string" ? JSON.parse(selected) : selected;

  $: filteredItems = filter(
    itemsArray,
    (item) =>
      !enabledSearch ||
      isEmpty(search) ||
      includes(lowerCase(item.value as string), lowerCase(search))
  );

  let containerComponent;
  let inputComponent;

  $: {
    if (!open) {
      enabledSearch = false;
    }
  }

  $: {
    if (open) {
      inputComponent.select();
    }
  }

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

  const onInput = (event) => {
    if (!enabledSearch) {
      enabledSearch = true;
    }
    search = event.target.value;
  };

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
        element: containerComponent,
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

<div class="container" bind:this={containerComponent} on:click|stopPropagation>
  <div class="title" on:click|stopPropagation={onOpen}>
    <div class="highlight text-shared" class:close={!open}>
      <div class="highlight-text">{highlight || ""}</div>
      <div class="search-text">{searchWithoutHighlight || ""}</div>
    </div>
    <input
      type="text"
      class:open
      class="search text-shared"
      value={search}
      on:input={onInput}
      bind:this={inputComponent}
    />
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
    {#each filteredItems as item}
      <li
        class="item"
        on:click|stopPropagation={() => onChange(item)}
        id={`dropdown-item-id-${item.id}`}
        class:selected={selected && selected.id === item.id}
      >
        <div class="highlight-text">{item.highlight || ""}</div>
        <div class="search-text">
          {item.highlight ? replace(item.value, item.highlight, "") : ""}
        </div>
      </li>
    {/each}
  </ul>
</div>

<style lang="scss">
  .container {
    font-family: var(--ts-dropdown-search-font-family, Arial, Helvetica, sans-serif);
    position: relative;
    background-color: var(--ts-select-bg-color, rgba(54, 54, 86, 1));
  }

  .title {
    position: relative;
    width: 100%;
  }

  .text-shared {
    font-size: var(---ts-select-input-font-size, 14px);
    line-height: var(--ts-select-input-line-height, 18px);
    box-sizing: border-box;
  }

  .highlight {
    padding: {
      top: 9px;
      left: 16px;
      right: 16px;
      bottom: 11px;
    }
    z-index: 1;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
    left: 0;
    bottom: 0;
    overflow: hidden;
    display: flex;
    opacity: 0;

    &.close {
      opacity: 1;
    }
  }

  .search {
    padding: 10px 16px;
    width: 100%;
    height: 100%;
    resize: none;
    border-width: 0;
    background-color: transparent;
    width: 100%;
    box-shadow: inset 0 -1px 0 0 var(--ts-select-border-color, rgba(255, 152, 0, 1));
    color: transparent;

    &.open {
      color: var(--ts-select-input-color, rgba(255, 255, 255, 1));
      box-shadow: inset 0 -1px 0 0 var(--ts-select-border-open-color, rgba(255, 0, 0, 1));
    }

    &:focus,
    &:active {
      outline: none;
    }
  }

  .highlight-text {
    color: var(--ts-highlight-select-color, rgba(162, 167, 172, 1));
  }
  .search-text {
    color: var(--ts-select-color, rgba(255, 255, 255, 1));
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
    display: flex;

    &:hover,
    &.selected {
      background-color: var(--ts-select-hover-color, rgba(3, 169, 244, 1));
    }
  }
</style>
