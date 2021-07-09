# OctoFetcher

- Clone down the repository 
- `npm install`
- then `npm start` to run the app in development.

The app defaults to `http://localhost:3000` but your default browser should open up automatically. 

The page will reload if you make edits.

You will also see any lint errors in the console.

### `npm test`

Launches the test runner in watch mode.

### `npm run build`

Builds a production version of the app to the `build` folder, optimizing the build for the best performance.

The build is minified and the filenames include the hashes.

### `Development vs Production API endpoints`

For development, you may find it simpler to use the local mock responses for the list and detail repository endpoints. To switch between hitting the actual endpoint and hitting our local files, simply switch the `testing` flag in `src/api/Api.js`.

```js
const testing = true;
```

### Usage

Something to note: you can use the form interface to query, or do it by way of query parameter like this:

```
http://localhost:3000/?q=lodash
```