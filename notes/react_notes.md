# React Notes

## Web Components

### Using web components in React
Note:

Web components often expose an imperative API. For instance, a `video` Web Component might expose `play()` and `pause()`
functions. To access imperative APIs of a Web Component, you will need to use a ref to interact with the DOM node directly.
If you are using 3rd party Web Components, the best solution is to write a React component that behaves as a wrapper
for your Web Component. Events emitted by a Web Component may not properly propagate through a React render tree. You will
need to manually attach event handlers to handle these events within your React components.

### Using React in your Web Components
```jsx harmony
class XSearch extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement('span');
    this.attachShadow({mode: 'open'}).appendChild(mountPoint);
    const name = this.getAttribute('name');
    const url = 'https://www.google.com/search?q=' + encodeURIComponent(name);
    ReactDOM.render(<a href={url}>{name}</a>, mountPoint);
  }
}
customElements.define('x-search', XSearch);
```

* Note: the code will not work if you transform classes with Babel. Include the es5 polyfill to fix this issue.

## React & Webpack
Steps
1. Lay out the project
   To start, we're going to structure our project in the following way:
   ```text
   proj/
   |_ dist/
   |_ src/
      |_ components/
   ```
2. Add types `npm install --save-dev @types/react @types/react-dom`
   
   That `@types/` prefix means that we also want to get the declaration files for React and React-DOM. Usually, when you
   import a path like "react", it will look inside of the `react`package itself; however, not all packages include declaration
   files, so TS also looks in the `@types/react` package as well. 
3. Next we'll add the development-time dependencies `npm install --save-dev typescript ts-loader source-map-loader`

   Both of these dependencies will let TS and webpack play together. `ts-loader` helps webpack compile your TS code using
   the TS's standard config file named `tsconfig.json`. `source-map-loader` uses any sourcemap outputs from TS to inform
   webpack when generating its own sourcemaps. This will allow you to debug your final output file as if you were debugging
   your original TS source code. Please note that `ts-loader` is not the only loader for TS.
   
4. Add a TS config file
   ```json
   {
       "compilerOptions": {
           "outDir": "./dist/",
           "sourceMap": true,
           "noImplicitAny": true,
           "module": "commonjs",
           "target": "es6",
           "jsx": "react"
       }
   }
   ```
5. Write some code

   Sample `Hello.tsx` as function component
   ```typescript jsx
   import * as React from "react";
   
   export interface HelloProps { compiler: string; framework: string; }
   
   export const Hello = (props: HelloProps) => <h1>Hello from {props.compiler} and {props.framework}!</h1>;
   ```

   Same one but classier
   ```typescript jsx
   import * as React from "react";
   
   export interface HelloProps { compiler: string; framework: string; }
   
   // 'HelloProps' describes the shape of props.
   // State is never set so we use the '{}' type.
   export class Hello extends React.Component<HelloProps, {}> {
       render() {
           return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
       }
   }
   ```
   
6. Add it to `index.tsx` in src (exactly how we would add to index.js)
7. Add `index.html`
8. Create a webpack config file `webpack.config.js` at the root of the project directory. Below sample shows what you need
   to add for react with TS
   
   ```javascript
   module.exports = {
     // enable sourcemaps for debugging webpack's output
     devtool: "source-map",
     resolve: {
       // add .ts and .tsx extensions 
       extensions: ['.ts', '.tsx']
     },
     module: {
       rules: [   
        {
            test: /\.ts(x?)$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: "ts-loader"
                }
            ]
        },
        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        {
            enforce: "pre",
            test: /\.js$/,
            loader: "source-map-loader"
        }
       ]
     },
     // When importing a module whose path matches one of the following, just
     // assume a corresponding global variable exists and use that instead.
     // This is important because it allows us to avoid bundling all of our
     // dependencies, which allows browsers to cache those libraries between builds.
     externals: {
         "react": "React",
         "react-dom": "ReactDOM"
     }
   }
   ```
9. Putting it all together, run `npx webpack`
