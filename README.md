[![npm](https://img.shields.io/npm/dt/helpful-decorators.svg)]()
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
`delay` - Add `setTimeout` functionality to the method

```js
import { delay } from 'helpful-decorators';

class Test {
 @delay(1000)
 method() {
   // ...
 }
}
```

`debounce` - Add `debounce` functionality to the method ([options](https://lodash.com/docs/4.17.4#debounce))

```js
import { debounce } from 'helpful-decorators';

class Test {
 @debounce(1000, options)
 method() {
   // ...
 }
}
```

`throttle` - Add `throttle` functionality to the method ([options](https://lodash.com/docs/4.17.4#throttle))
```js
import { throttle } from 'helpful-decorators';

class Test {
 @throttle(1000, options)
 method() {
   // ...
 }
}
```

`once` - Add `once` functionality to the method
```js
import { once } from 'helpful-decorators';

class Test {
 @once
 method() {
   // This will run only once
 }
}
```

`measure` - measure time taken by a function to execute
```js
import { measure } from 'helpful-decorators';

class Test {
 @measure
 doSomething() {
   // Call to doSomething took 0.35 milliseconds.
 }
}
```

`Mixin` - this pattern is used to achieve multiple inheritance
```js
import { Mixin } from 'helpful-decorators';

@Mixin([Disposable, Activatable])
class Test {
}
```

`memo` - memoizes the result of the function
```js
import { memo } from 'helpful-decorators';

class Test {
 
  @memo()
  method() {
    ...memoized
  }
}
```

`bind` - automatically bind methods to class instances
```js
import { bind } from 'helpful-decorators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
    document.body.addEventListener('click', this.onClick);
  }

  @bind
  onClick($event) {
    console.log($event);
  }
}
```

`SortBy` - sort an array by a specific property in individual elements or non-object items (By default, it sorts by `type === 'string'` and `isDescending === true`)
```js
import { SortBy } from 'helpful-decorators';

class Test {
  
  @SortBy('name', {
    isDescending: false,
    type: 'string'
  })
  names = [ { name: 'b' }, { name: 'a' }, { name: 'c' } ];

  @SortBy('', {
    isDescending: true,
    type: 'date'
  })
  dates = [ '2020-06-17', '2020-06-16', '2020-06-20', '2020-06-10' ];

  @SortBy('', {
    isDescending: false,
    type: 'number'
  })
  numbers = [ 6, 3, 4, 1 ];
}
```
 
License
----

MIT
