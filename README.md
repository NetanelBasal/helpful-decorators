# Array pagination

Simple pagination for arrays in javascript
## Installation
```js
npm install paginate-array-ts
```

## Usage

```js

import { paginateArray } from 'paginate-array-ts';
const collection = [...];

const paginateCollection = paginate<T>(collection[,pageNumber, numItemsPerPage]);

The result of paginateCollection will be an object:

{
    currentPage: 1,
    perPage: 10,
    total: 20,
    totalPages: 2,
    data: [...]
}
```
