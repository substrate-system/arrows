# arrows
[![tests](https://img.shields.io/github/actions/workflow/status/substrate-system/arrows/nodejs.yml?style=flat-square)](https://github.com/substrate-system/arrows/actions/workflows/nodejs.yml)
[![types](https://img.shields.io/npm/types/@substrate-system/arrows?style=flat-square)](README.md)
[![module](https://img.shields.io/badge/module-ESM%2FCJS-blue?style=flat-square)](README.md)
[![install size](https://flat.badgen.net/packagephobia/install/@substrate-system/arrows?cache-control=no-cache)](https://packagephobia.com/result?p=@substrate-system/arrows)
[![GZip size](https://flat.badgen.net/bundlephobia/minzip/@substrate-system/arrows?color=green)](https://bundlephobia.com/package/@substrate-system/arrows)
[![dependencies](https://img.shields.io/badge/dependencies-zero-brightgreen.svg?style=flat-square)](package.json)
[![semantic versioning](https://img.shields.io/badge/semver-2.0.0-blue?logo=semver&style=flat-square)](https://semver.org/)
[![Common Changelog](https://nichoth.github.io/badge/common-changelog.svg)](./CHANGELOG.md)
[![license](https://img.shields.io/badge/License-Big_Time-blue?style=flat-square)](LICENSE)


Next and previous icons as web components.

[See a live demo](https://substrate-system.github.io/arrows/)

<!-- toc -->

- [Install](#install)
- [Modules](#modules)
  * [ESM](#esm)
  * [Common JS](#common-js)
  * [pre-built](#pre-built)
- [CSS](#css)
  * [Import CSS](#import-css)
- [Use](#use)
  * [JS](#js)
  * [CSS](#css-1)

<!-- tocstop -->

## Install

```sh
npm i -S @substrate-system/arrows
```

--------------------------

## Modules

This exposes ESM and common JS via [package.json `exports` field](https://nodejs.org/api/packages.html#exports).

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
cp ./node_modules/@substrate-system/arrows/dist/index.min.js ./public/substrate-arrows.min.js
cp ./node_modules/@substrate-system/arrows/dist/style.min.css ./public/substrate-arrows.css
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

This depends on the `visually-hidden` CSS class. Import
[@substrate-system/a11y](https://github.com/substrate-system/a11y) for this:

```js
import '@substrate-system/a11y/visually-hidden'
```

### JS
```js
import { SubstrateBack, SubstrateNext } from '@substrate-system/arrows'

SubstrateBack.define()
SubstrateNext.define()

document.body.innerHTML += `
    <substrate-back></substrate-back>
    <substrate-next></substrate-next>
`
```

### CSS

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
```
