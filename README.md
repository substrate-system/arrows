# arrows
[![tests](https://img.shields.io/github/actions/workflow/status/substrate-system/arrows/nodejs.yml?style=flat-square)](https://github.com/substrate-system/arrows/actions/workflows/nodejs.yml)
[![types](https://img.shields.io/npm/types/@substrate-system/arrows?style=flat-square)](README.md)
[![module](https://img.shields.io/badge/module-ESM%2FCJS-blue?style=flat-square)](README.md)
[![install size](https://flat.badgen.net/packagephobia/install/@substrate-system/arrows?cache-control=no-cache)](https://packagephobia.com/result?p=@substrate-system/arrows)
[![GZip size](https://flat.badgen.net/bundlephobia/minzip/@substrate-system/arrows?color=green)](https://bundlephobia.com/package/@substrate-system/arrows)
[![semantic versioning](https://img.shields.io/badge/semver-2.0.0-blue?logo=semver&style=flat-square)](https://semver.org/)
[![Common Changelog](https://nichoth.github.io/badge/common-changelog.svg)](./CHANGELOG.md)
[![license](https://img.shields.io/badge/License-Big_Time-blue?style=flat-square)](LICENSE)


Next and previous icons as 
[accessible web components](https://www.sarasoueidan.com/blog/accessible-icon-buttons/).

[See a live demo](https://substrate-system.github.io/arrows/)

<details><summary><h2>Contents</h2></summary>

<!-- toc -->

- [Install](#install)
- [Modules](#modules)
  * [ESM](#esm)
  * [Common JS](#common-js)
  * [pre-built](#pre-built)
- [CSS](#css)
  * [Import CSS](#import-css)
- [Use](#use)
  * [server side](#server-side)
  * [Client-Side](#client-side)
  * [CSS](#css-1)
  * [Buttons](#buttons)
  * [Links](#links)

<!-- tocstop -->

</details>

## Install

```sh
npm i -S @substrate-system/arrows
```

--------------------------

## Modules

This exposes ESM and common JS via 
[package.json `exports` field](https://nodejs.org/api/packages.html#exports).

### ESM
```js
import { SubstrateBack, SubstrateNext } from '@substrate-system/arrows'
```

### Common JS
```js
const arrows = require('@substrate-system/arrows')
```

### pre-built
This package exposes minified JS and CSS files too. Copy them to a location
that is accessible to your web server, then link to them in HTML.

#### copy
```sh
cp ./node_modules/@substrate-system/arrows/dist/index.min.js \
    ./public/substrate-arrows.min.js
cp ./node_modules/@substrate-system/arrows/dist/style.min.css \
    ./public/substrate-arrows.css
```

#### HTML
```html
<head>
    <link rel="stylesheet" href="./substrate-arrows.css">
</head>
<body>
    <substrate-back></substrate-back>
    <substrate-next></substrate-next>
    <!-- ... -->
    <script type="module" src="./substrate-arrows.min.js"></script>
</body>
```

------------------------

## CSS

### Import CSS

```js
import '@substrate-system/arrows/css'
```

Or minified:
```js
import '@substrate-system/arrows/css/min'
```


--------------------------------------------------------------


## Use

### server side

This is implemented as an 
[HTML web component](https://adactio.com/journal/20618),
which means it can be easily rendered to a string, then made interactive on the
client side.

Import the `/html` path in node, and use the `.html` or `.outerHTML` function
for HTML content:

```js
import {
    AnchorBack,
    AnchorNext,
    SubstrateBack,
    SubstrateNext
} from '@substrate-system/arrows/html'

// Basic usage
const backLink = AnchorBack.html({ href: '/abc' })
const nextButton = SubstrateNext.html({ disabled: true })

// multiple attributes
const styledButton = SubstrateBack.html({
    disabled: false,
    class: 'primary-btn',
    'data-testid': 'back-button',
    id: 'main-back'
})

const externalLink = AnchorNext.html({
    href: 'https://example.com',
    target: '_blank',
    rel: 'noopener noreferrer',
    class: 'external-link'
})
```

Each component also provides:
- `.TAG` property with the custom element tag name
- `.outerHTML()` function to render the complete custom element with 
  wrapper tags

```js
// Get the tag name
console.log(SubstrateBack.TAG) // 'substrate-back'

// Render complete element with wrapper (basic)
const completeButton = SubstrateBack.outerHTML({ disabled: true })
// Returns: <substrate-back disabled>
//            <button disabled>...</button>
//          </substrate-back>

const completeLink = AnchorNext.outerHTML({ href: '/next' })
// Returns: <anchor-next href="/next">
//            <a href="/next">...</a>
//          </anchor-next>

// Attributes are applied to both the custom element wrapper AND inner element
const styledButton = SubstrateBack.outerHTML({
    class: 'styled-btn',
    disabled: true,
    'data-testid': 'back-button'
})
// Returns: <substrate-back class="styled-btn" disabled data-testid="back-button">
//            <button class="styled-btn" disabled data-testid="back-button">...</button>
//          </substrate-back>
```


### client side

If the component has been rendered on the server, then you just need to add
interactivity on the client side.

Import from the `/client` path to include a "light" version of the component,
that will not render anything; it will just attach event listeners.

```js
import { SubstrateBack, SubstrateNext } from '@substrate-system/arrows/client'
```

#### Full client side

For when you want to render on the client, and also "hydrate" client-side.

Import the root path to include a web component that will both render itself,
and also attach event listeners. This cannot be used in node, because it depends
on browser APIs.

```js
import { SubstrateBack, SubstrateNext } from '@substrate-system/arrows'
import { AnchorBack, AnchorNext } from '@substrate-system/arrows/links'
```

### CSS

This depends on the `visually-hidden` CSS class. Import
[@substrate-system/a11y](https://github.com/substrate-system/a11y) for this:

```js
import '@substrate-system/a11y/visually-hidden'
```

Disabled status is handled correctly in JS, but the `:disabled` attribute in CSS
doesn't work on custom elements. So target the nested `button` element.

```css
/* application code */
substrate-next, substrate-back {
    & button {
        cursor: pointer;

        &:disabled {
            opacity: 0.4;
            cursor: initial;
        }
    }
}

/* anchors */
anchor-next, anchor-back {
    &.disabled {
        & a {
            opacity: 0.4;
        }
    }
}
```

### Buttons

```js
import { SubstrateBack, SubstrateNext } from '@substrate-system/arrows'

SubstrateBack.define()
SubstrateNext.define()

document.body.innerHTML += `
    <substrate-back></substrate-back>
    <substrate-next></substrate-next>
`
```

### Links

Render an `a` element, not a button.

Setting `.disabled = true`, or setting the `disabled` attribute, on an anchor
button will remove the `href` attribute from the internal link tag, effectively
disabling it.

```js
import {
    AnchorBack,
    AnchorNext
} from '@substrate-system/arrows/links'

AnchorBack.define()
AnchorNext.define()

document.body.innerHTML += `
  <anchor-back class="test" href="/back"></anchor-back>
  <anchor-next class="test" href="/next"></anchor-next>
`
```
