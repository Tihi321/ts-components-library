<svelte:options tag={null} />

<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { useAvoidElementCallback } from "tsl-utils";
  import { tooltipPlacement, tooltipTrigger } from "../../constants";
  const slotName = "tooltip-slot";

  let visible: boolean = false;
  export let trigger = tooltipTrigger.Hover;
  export let placement = tooltipPlacement.Bottom;
  export let hideArrow: boolean = false;

  const { onEventCallback } = useAvoidElementCallback({
    datasetName: "tooltip",
    slotName,
    callback: () => {
      if (open) {
        visible = false;
      }
    },
  });

  const onTriggerClick = () => {
    if (trigger === tooltipTrigger.Click) {
      visible = !visible;
    }
  };
  const onMouseEnter = () => {
    if (trigger === tooltipTrigger.Hover) {
      visible = true;
    }
  };
  const onMouseLeave = () => {
    if (trigger === tooltipTrigger.Hover) {
      visible = false;
    }
  };

  onMount(() => {
    if (trigger === tooltipTrigger.Click) {
      document.addEventListener("mousedown", onEventCallback);
    }
  });

  onDestroy(() => {
    if (trigger === tooltipTrigger.Click) {
      document.removeEventListener("click", onEventCallback);
    }
  });
</script>

<div
  class="tooltip-container"
  class:visible
  data-dropdown={slotName}
  on:mouseenter={onMouseEnter}
  on:mouseleave={onMouseLeave}
  on:click={onTriggerClick}
>
  <slot />
  {#if visible}
    <div
      class="tooltip"
      class:top={placement === tooltipPlacement.Top}
      class:bottom={placement === tooltipPlacement.Bottom}
      class:left={placement === tooltipPlacement.Left}
      class:right={placement === tooltipPlacement.Right}
      class:hide-arrow={hideArrow}
    >
      <slot name="tooltip" />
      {#if !hideArrow}
        <div
          class="arrow-container"
          class:top={placement === tooltipPlacement.Top}
          class:bottom={placement === tooltipPlacement.Bottom}
          class:left={placement === tooltipPlacement.Left}
          class:right={placement === tooltipPlacement.Right}
        >
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
      {/if}
    </div>
  {/if}
</div>

<style lang="scss">
  .tooltip-container {
    cursor: pointer;
    position: relative;
    display: block;
  }

  .tooltip {
    position: absolute;
    z-index: 999;
    top: initial;
    left: initial;
    right: initial;
    bottom: initial;
    background-color: var(--ts-tooltip-bg-color, rgba(255, 255, 255, 1));
    color: var(--ts-tooltip-color, rgba(35, 39, 57, 1));
    filter: drop-shadow(0 0 2px var(--ts-tooltip-filter-color, rgba(192, 192, 192, 1)));
    border-radius: 3px;
    opacity: 0.9;
    font-size: 12px;
    line-height: 16px;
    font-weight: 400;
    letter-spacing: 0px;
    padding: 8px;
    max-width: 600px;
    width: max-content;

    &.left {
      top: 50%;
      right: 100%;
      transform: translate(-12px, -50%);

      &.hide-arrow {
        transform: translate(-4px, -50%);
      }
    }

    &.right {
      top: 50%;
      left: 100%;
      transform: translate(12px, -50%);

      &.hide-arrow {
        transform: translate(4px, -50%);
      }
    }

    &.bottom {
      top: 100%;
      left: 50%;
      transform: translate(-50%, 12px);

      &.hide-arrow {
        transform: translate(-50%, 4px);
      }
    }

    &.top {
      bottom: 100%;
      left: 50%;
      transform: translate(-50%, -12px);

      &.hide-arrow {
        transform: translate(-50%, -4px);
      }
    }
  }

  .arrow-container {
    cursor: pointer;
    position: absolute;

    &.right {
      bottom: calc(50% - 2px);
      left: -10px;
      transform: rotate(150deg) translate(0%, -50%);
    }

    &.left {
      bottom: calc(50% - 2px);
      right: -10px;
      transform: rotate(210deg) translate(0%, -50%);
    }

    &.bottom {
      top: -10px;
      left: 50%;
      transform: rotate(0) translate(-50%, 0);
    }

    &.top {
      bottom: -10px;
      left: 50%;
      transform: rotate(180deg) translate(50%, 0);
    }

    .arrow-icon {
      width: 100%;
      height: 100%;
    }
    .arrow-icon-path {
      fill: var(--ts-tooltip-bg-color, rgba(255, 255, 255, 1));
    }
  }
</style>
