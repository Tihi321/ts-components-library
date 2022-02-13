<svelte:options tag={null} />

<script lang="ts">
  export let open: boolean = false;

  $: openString = typeof open === "string" ? open === "true" : open;

  const onClick = () => {
    open = !openString;
  };
</script>

<div class="container">
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
    <div class="title">
      <slot name="title" />
    </div>
  </div>
  <div class="content" class:open={openString}>
    <slot />
  </div>
</div>

<style lang="scss">
  @import "src/styles/all";

  .container {
    overflow: hidden;
    color: var(--ts-accordion-color, rgba(255, 255, 255, 1));
  }

  .header {
    padding: 16px;
    display: flex;
    align-items: center;
    cursor: pointer;
    border-bottom: 2px solid var(--ts-accordion-border-color, rgba(35, 39, 57, 1));
    background: var(
      --ts-accordion-bg-glass-color,
      linear-gradient(135deg, rgba(37, 141, 200, 1) 0%, rgba(37, 141, 200, 1) 100%)
    );
  }

  .title {
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
  }

  .content {
    padding: 0 36px;
    opacity: 0;
    max-height: 0;
    transition: all 0.3s ease;
    background-color: var(--ts-accordion-content-bg-color, rgba(35, 39, 57, 1));
    color: var(--ts-accordion-content-primary-color, rgba(35, 39, 57, 1));

    &.open {
      padding: 8px 36px;
      max-height: 9999px;
      opacity: 1;
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
      fill: var(--ts-accordion-icon-color, rgba(255, 255, 255, 1));
    }
  }
</style>
