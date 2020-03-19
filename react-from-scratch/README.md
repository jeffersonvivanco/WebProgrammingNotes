# react-from-scratch
Some notes on react. These notes come from other sources such
as react docs and react blog posts.

## Building a react app from scratch
Here is how to build a react app from scratch. Although react
provides `create-react-app` which allows you to easily set up
a react app, sometimes you want to know what is it down under
the hood to just know or to customize it.

There are a couple of hurdles to starting a react app.
1. Node can't process all of the syntax (such as import/export, and jsx)
2. You'll either need to build your files or serve them somehow during
   development for your app to work.
Luckily, we can handle these issues with **Babel** and **Webpack**.

### Setup
1. create a new directory for your app
2. run `npm init`
3. run `git init`
4. In your new project folder, create the following structure
   - public
   - src 
5. Add `node_modules/` and `dist/` to .gitignore
6. Add index.html to public directory.
7. Now we need to make sure the code we write can be compiled, so we'll need Babel
   - run `npm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/preset-react`
   - `babel-core` is the main babel package--we need this for babel to do any transformations on our code.
   - `babel-cli` allows you to compile files from the command line.
   - `preset-react` and `preset-env` are both presets that transform ES6+ into more traditional javascript
     and the `react` preset does the same but with JSX instead.
8. In the project root, create a file called `.babelrc`. Here we're telling babel that we're going to use the `env` and
   `react` presets. `.babelrc`
   ```json
   {
     "presets": ["@babel/env", "@babel/preset-react"]
   }
   ``` 
   Babel also has a ton of plugins available that can be used if you only need to transform specific features or some
   feature you need isn't covered by `env`.
9. Now we'll need to acquire and configure Webpack
   - run `npm install --save-dev webpack webpack-cli webpack-dev-server style-loader css-loader babel-loader`
   - Webpack uses loaders to process different types of files for bundling. It also works easily alongside the development
     server that we're going to use to serve our React project in development and reload browser pages on (saved) changes
     to our React components. In order to utilize any of this though, we'll need to configure Webpack to use our loaders
     and prepare the dev server.
   - create a new file at the root of the project called `webpack.config.js`. This file exports an object with webpack's
     configuration.
10. Now its time to add React
    - run `npm install --save react react-dom`
    - we'll need to tell our React app where to hook into the DOM (in our `index.html`). Create a file
      called `index.js` in your src directory and add the react render code.
    - Now create components and start development
11. We now have a functioning react app. We can start our dev server by executing
    `webpack-dev-server --mode development` in the terminal.
12. Finishing HMR (Hot Module Replacement)
    - note we added the HMR plugin in `webpack.config.js`, this will allow webpack-dev-server to automatically restart
      when there is a change in our files
    - We have to tell HMR what to changes to look for, for that we need to install one more dependency
    - run `npm install --save react-hot-loader`
    - now import `react-hot-loader`, (`import {hot} from 'react-hot-loader'`) in your root component (most likely `App.js`) 
      and mark the exported object as hot reloaded: `export default hot(module)(App);`.
    - when you run your app now changes to the code should update the client immediately.
    
### Last details
You might notice something interesting about starting your project. Built files never show up in your `dist` folder. See,
`webpack-dev-server` is actually serving the bundled files from memory--once the server stops, they're gone. To actually
build your files, we're going to utilize `webpack` proper--add a script called `build` in your `package.json` with the
following command: `webpack --mode development`. You can replace `development` with `production`, but if you completely
omit `--mode`, it will fall back to the latter and give you a warning.

