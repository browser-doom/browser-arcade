**IMPORTANT**: Docker is required for compiling the games into Web Assembly. Some games require a modified Emscripten toolchain and/or
a custom version, and to avoid burdening the user with downloading, patching and building a Emscripten toolchain, Docker is used
for building the games

## Available Scripts

In the project directory, you can run:

### `npm docker:build`

This will do a build of all games. This is a required step that must be done before `npm start` will work.

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.