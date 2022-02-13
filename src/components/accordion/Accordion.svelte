<svelte:options tag={null} />

<script lang="ts">
  export let open: boolean = false;

  const onClick = () => {
    open = !open;
  };
</script>

<div class="container">
  <div class="header" on:click={onClick}>
    <div class="icon-container">
      <div class="icon" class:open>
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
  <div class="content" class:open>
    <slot />
  </div>
</div>

<style lang="scss">
  @import "src/styles/all";

  .container {
    overflow: hidden;
    color: $accordion-color;
  }

  .header {
    padding: 16px;
    display: flex;
    align-items: center;
    cursor: pointer;
    border-bottom: 2px solid $accordion-border-color;
    background: $accordion-bg-color;
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
    background-color: $accordion-content-bg-color;
    color: $accordion-content-color;

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
      fill: $accordion-icon-color;
    }
  }
</style>
