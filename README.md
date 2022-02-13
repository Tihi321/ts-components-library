# Ts Components library

small svelte web components library, can be used as web components through html, or as svelte library

[Storybook](https://tihi321.github.io/ts-components-library/)
[Examples](https://github.com/Tihi321/ts-components-library/blob/main/index.html)

To use components directly in Svelte project, project must have typescript support

```bash
yarn add git+https://github.com/Tihi321/ts-components-library.git#{tag/version}
```

```bash
yarn add git+https://github.com/Tihi321/ts-components-library.git#1.0.0
```

or use it directly within script tag, atributes can be passed from html as string or through javascript directly for webcomponents

```html
<script
  type="text/javascript"
  src="https://cdn.jsdelivr.net/gh/Tihi321/ts-components-library/cdn/index.js"
  async
></script>
```

## Components

1.  **Toggle** - Toggle

    _Element_<br/>
    **`<ts-toggle class="toggle" value="true"></ts-toggle>`**

2.  **Checkbox** - Checkbox

    _Element_<br/>
    **`<ts-checkbox class="toggle" checked="true"><slot slot="label">Label</slot></ts-checkbox>`**

3.  **Accordion** - Accordion

    _Element_<br/>
    **`<ts-accordion open="true"><slot slot="title">Title</slot>Text...</ts-accordion>`**

4.  **Dropdown** - Dropdown

    _Element_<br/>
    **`<ts-dropdown class="dropdown" items='[{"id":"1","value":"test"},{"id":"2","value":"test3"}]'></ts-dropdown>`**

5.  **Tooltip** - Custom tooltip

    _Element_<br/>
    **`<ts-tooltip class="tooltip" trigger="Hover" placement="Top"><slot slot="tooltip">Tooltip content</slot>Content</ts-tooltip>`**

Dependecies

- [TSL Utils](https://www.npmjs.com/package/tsl-utils)

Technologies used to create this website are

- [Svelte](https://svelte.dev/)
- [Typescript](https://www.typescriptlang.org/)
