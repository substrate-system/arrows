# back
![tests](https://github.com/substrate-system/back/actions/workflows/nodejs.yml/badge.svg)
[![types](https://img.shields.io/npm/types/@substrate-system/back?style=flat-square)](README.md)
[![module](https://img.shields.io/badge/module-ESM%2FCJS-blue?style=flat-square)](README.md)
[![install size](https://packagephobia.com/badge?p=@substrate-system/back)](https://packagephobia.com/result?p=@substrate-system/back)
[![GZip size](https://img.badgesize.io/https%3A%2F%2Fesm.sh%2F%40substrate-system%2Fback%2Fes2022%2Ffile.mjs?style=flat-square&compression=gzip)](https://esm.sh/@substrate-system/back/es2022/back.mjs)
[![dependencies](https://img.shields.io/badge/dependencies-zero-brightgreen.svg?style=flat-square)](package.json)
[![semantic versioning](https://img.shields.io/badge/semver-2.0.0-blue?logo=semver&style=flat-square)](https://semver.org/)
[![Common Changelog](https://nichoth.github.io/badge/common-changelog.svg)](./CHANGELOG.md)
[![license](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE)

`<package description goes here>`

[See a live demo](https://substrate-system.github.io/back/)

<!-- toc -->

## install

Installation instructions

```sh
npm i -S @substrate-system/back
```

## API

This exposes ESM and common JS via [package.json `exports` field](https://nodejs.org/api/packages.html#exports).

### ESM
```js
import '@substrate-system/back'
```

### Common JS
```js
require('@substrate-system/back')
```

## CSS

### Import CSS

```js
import '@substrate-system/back/css'
```

Or minified:
```js
import '@substrate-system/back/css/min'
```

### Customize CSS via some variables

```css
substrate-back {
    --example: pink;
}
```

## use
This calls the global function `customElements.define`. Just import, then use
the tag in your HTML.

### JS
```js
import '@substrate-system/back'
```

### HTML
```html
<div>
    <substrate-back></substrate-back>
</div>
```

### pre-built
This package exposes minified JS and CSS files too. Copy them to a location that is
accessible to your web server, then link to them in HTML.

#### copy
```sh
cp ./node_modules/@substrate-system/back/dist/index.min.js ./public/substrate-back.min.js
cp ./node_modules/@substrate-system/back/dist/style.min.css ./public/substrate-back.css
```

#### HTML
```html
<head>
    <link rel="stylesheet" href="./substrate-back.css">
</head>
<body>
    <!-- ... -->
    <script type="module" src="./substrate-back.min.js"></script>
</body>
```
