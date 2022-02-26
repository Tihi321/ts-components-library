export * from "./index";
import { domReady } from "tsl-utils";

import { LIBRARY_NAME, LIBRARY_PREFIX } from "./constants/library";

const splitByCapitalLetters = (name: string) =>
  name
    .split(/(?=[A-Z])/)
    .join("-")
    .toLowerCase();

domReady(() => {
  if (window && window[LIBRARY_NAME]) {
    const componentns = window[LIBRARY_NAME] || {};

    Object.keys(componentns).map((key) => {
      const name = splitByCapitalLetters(key);
      const component = componentns[key];

      if (typeof component === "function") {
        customElements.define(`${LIBRARY_PREFIX}-${name}`, component);
      }
    });
  }
});
