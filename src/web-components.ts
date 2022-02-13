import { domReady } from "tsl-utils";

domReady(() => {
  // -------------------------------------------------------------
  // Accordion
  if (document.querySelector("ts-accodrion")) {
    import("./components/accordion/Accordion.svelte");
  }

  // -------------------------------------------------------------
  // Toggle
  if (document.querySelector("ts-toggle")) {
    import("./components/buttons/Toggle.svelte");
  }

  // -------------------------------------------------------------
  // Dropdown
  if (document.querySelector("ts-dropdown")) {
    import("./components/select/Dropdown.svelte");
  }

  // -------------------------------------------------------------
  // Tooltip
  if (document.querySelector("ts-tooltip")) {
    import("./components/tooltip/Tooltip.svelte");
  }
});
