export * from "./index";

import { domReady } from "tsl-utils";

import { LIBRARY_NAME, LIBRARY_PREFIX } from "./constants/library";

domReady(() => {
  if (window && window[LIBRARY_NAME]) {
    const componentns = window[LIBRARY_NAME] || {};

    Object.keys(componentns).map((key) => {
      const name = key.toLowerCase();
      const component = componentns[key];

      customElements.define(`${LIBRARY_PREFIX}-${name}`, component);
    });
  }
});
