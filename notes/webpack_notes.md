# Webpack
webpack is used to compile JS modules. Once installed, you can interface with webpack either from its CLI or API. Look
at ===> `webpack_demo`

## Getting Started

### Basic Setup
1. Make a directory and run npm init
2. `npm install webpack webpack-cli --save-dev`
3. Adjust *package.json*. Mark `private` as `true` and remove the `main` entry. This is to prevent accidental
publish of your code.

### Creating a bundle
1. First we'll tweak our directory structure slightly, separating the "source" code (`/src`) from our "distribution"
code (`/dist`). The source code is the code that we'll write and edit. The distribution code is the minimized and optimized
`output` of our build process that will eventually be loaded in the browser. Tweak the directory structure as follows
```txt
webpack-demo
|- package.json
|- /dist
  |- index.html
|- /src
  |- index.js
```
2. To bundle a dependency with `index.js`, we'll need to install the library locally `npm install some_dependency --save`
When installing a package that will be bundled into your production bundle, you should use `npm install --save`. If you're
installing a package for development purposes (e.g., linter) then you should use `npm install --save-dev`.
3. Update `index.html` to include `main.js`
4. In this sample setup, `index.js` explicitly requires `lodash` to be present, and it binds it as `_`(no global scope
pollution). By stating what dependencies a module needs, webpack can use this information to build a dependency graph. It
then uses the graph to generate an optmized bundle where scripts will be executed in the correct order.
5. Run `npx webpack`, which will take our script at `src/index.js` as the entry point, and will generate `dist/main.js` as
the output.
6. Done

### Modules
The `import` and `export` statements have been standardized in ES2015. Although they are not supported in most browsers
yet, webpack does support them out of the box. Behind the scenes, webpack actually "transpiles" the code so that older
browsers can also run it. If you inspect `dist/main.js`, you might be able to see how webpack does this, it's quite ingenious.
Besides `import` and `export`, webpack supports various other module syntaxes as well. Note that webpack will not alter any
code other than `import` and `export` statements. If you are using other es2015 features, make sure to use a transpiler such
as Babel or Bublé via webpack's loader system.

### Using a configuration
For a more complex setup, add a config file `webpack.config.js`. Run `npx webpack --config webpack.config.js`.
If a `webpack.config.js` is present, webpack picks it up by default. A configuration file allows far more flexibility
than simple CLI usage. We can specify loader rules, plugins, resolve options and many other enhancements this way.

### npm scripts
```json
"scripts": {
    "build": "webpack"
}
```
* Run `npm run build`
* Custom parameters can be passed to webpack by adding two dashes between the `npm run build` command and your parameters
e.g. `npm run build -- --colors`. 

## Module Federation
