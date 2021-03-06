<svelte:options tag={null} />

<script lang="ts">
  export let open: boolean = false;

  $: openString = typeof open === "string" ? open === "true" : open;

  const onClick = () => {
    open = !openString;
  };
</script>

<div>
  <div class="header" on:click={onClick}>
    <div class="icon-container">
      <div class="icon" class:open={openString}>
        <svg
          width="12"
          height="7"
          view-box="0 0 12 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="arrow-icon"
        >
          <path
            class="arrow-icon-path"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M6.00589 5.55028L11.2735 0.000284672L12 0.685205L6.00646 7L0.0037775 0.68549L0.729699 0L6.00589 5.55028Z"
            fill="#F7FAFD"
          />
        </svg>
      </div>
    </div>
    {#if $$slots.title}
      <div class="title">
        <slot name="title" />
      </div>
    {/if}
  </div>
  <div class="content" class:open={openString}>
    <slot />
  </div>
</div>

<style lang="scss">
  .header {
    padding: var(--ts-accordion-header-padding, 8px);
    color: var(--ts-accordion-header-color, var(--ts-accordion-color, rgba(255, 255, 255, 1)));
    background-color: var(
      --ts-accordion-header-bg-color,
      var(--ts-accordion-bg-color, rgba(54, 54, 86, 1))
    );
    border-color: var(--ts-accordion-border-color, var(--ts-accordion-color, rgba(255, 152, 0, 1)));
    border-style: var(--ts-accordion-border-style, solid);
    border-width: var(--ts-accordion-border-width, 0);
    border-bottom-width: var(--ts-accordion-border-bottom-width, 1px);
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .title {
    font-size: 18px;
    font-style: normal;
    line-height: 24px;
  }

  .content {
    padding: var(--ts-accordion-content-padding, 0 8px);
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.5s cubic-bezier(0, 1.05, 0, 1);
    background-color: var(
      --ts-accordion-content-bg-color,
      var(--ts-accordion-color, rgba(255, 255, 255, 1))
    );
    color: var(--ts-accordion-content-color, var(--ts-accordion-bg-color, rgba(54, 54, 86, 1)));

    &.open {
      max-height: 1000px;
      overflow-y: auto;
    }
  }

  .icon-container {
    padding-right: 10px;
  }

  .icon {
    transition: transform 0.2s ease;
    transform: rotate(180deg);

    &.open {
      transform: rotate(0);
    }

    .arrow-icon-path {
      fill: var(--ts-accordion-icon-color, var(--ts-accordion-color, rgba(255, 152, 0, 1)));
    }
  }
</style>
