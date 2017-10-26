[![Build Status](https://travis-ci.org/NetanelBasal/helpful-decorators.svg?branch=master)](https://travis-ci.org/NetanelBasal/helpful-decorators)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)
[![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/sindresorhus/awesome)

# Helpful Decorators For Typescript Projects

## Installation
```js
npm install helpful-decorators
yarn add helpful-decorators
```

## Usage
`timeout` - Add `setTimeout` functionality to the method
```ts
import { timeout } from 'helpful-decorators';

class Test {
 @timeout(1000)
 method() {
   // ...
 }
}
```

`debounce` - Add `debounce` functionality to the method ([options](https://lodash.com/docs/4.17.4#debounce))
```ts
import { debounce } from 'helpful-decorators';

class Test {
 @debounce(1000, options)
 method() {
   // ...
 }
}
```

`throttle` - Add `throttle` functionality to the method ([options](https://lodash.com/docs/4.17.4#throttle))
```ts
import { throttle } from 'helpful-decorators';

class Test {
 @throttle(1000, options)
 method() {
   // ...
 }
}
```

`once` - Add `once` functionality to the method
```ts
import { once } from 'helpful-decorators';

class Test {
 @once
 method() {
   // This will run only once
 }
}
```

### Roadmap

 - ~~timeout~~
 - ~~debounce~~
 - ~~throttle~~
 - ~~once~~
 - memoize
 - ...
 
License
----

MIT