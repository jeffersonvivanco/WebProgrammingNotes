# Micro Frontend Architecture

## Ecosystem

### Container
* an application container loads application javascript bundles at runtime
* takes care of routing all app (app is a web component) rest calls to the proper
  backend
* loads dependencies of apps
  * libraries and polyfills (angular requires zonejs, customElements requires webcomponents polyfills) can be loaded at
    runtime or compile time
  * other web components can be loaded at runtime
* passes data as attributes to web components
* subscribes to events from web components

### Micro Frontend App
* app is build as a single js bundle
* js bundle defines web components for containers to use
* app documents dependencies so the app container knows and loads
  those dependencies
  * note: **APP DOES NOT LOAD OTHER WEB COMPONENTS**
![microfrontent ecosystem](./assets/microfrontend-ecosystem.jpg)

## The technicals

### Web Component
The micro frontend app defines web components using the native
`customElements` interface. You can build web components natively
or you can use an existing web framework like angular to build
your web components.

### Web Component from Angular Component

**Mapping**
* Mapping - a custom element hosts an Angular component, providing a bridge between the data and logic
  defined in the component and standard DOM APIs. Component properties and logic maps directly into HTML
  attributes and the browser's event system.
  * the creation api parses the component looking for input properties, and defines corresponding attributes
    for the custom element. It transforms the property names to make them compatible with custom elements,
    which do not recognize case distinctions. The resulting attribute names use dash-separated lowercase.
    For example, for a component with `@Input('myInputProp') inputProp`, the corresponding custom element
    defines an attribute `my-input-prop`.
  * component outputs are dispatched as HTML Custom Events, with the name of the custom event matching the
    output name. For example, for a component with `@Output() valueChanged = new EventEmitter()`, the
    corresponding custom element will dispatch events with the name "valueChanged", and the emitted data
    will be stored on the event's `detail` property. If you provide an alias, that value is used.
    
**Dependencies**
* `ng add @angular/elements`
* `ng add ngx-build-plus`


**Steps**
1. Add component(s) that you wish to create custom element to `entryComponents` list in `AppModule`
2. Remove `AppComponent` from `bootstrap` list in `AppModule` and add it to `entryComponents`
3. Add the following to `AppModule` class
```typescript
declare const APPLICATION;
//...
export class AppModule {
    constructor(private injector: Injector) {}  
    ngDoBootstrap(appRef: ApplicationRef): void {
        if (typeof APPLICATION !== 'undefined' && APPLICATION === 'micro') {
            const myCustomElement = createCustomElement(BookingComponent, { injector: this.injector });
            customElements.define('app-flight-booking', myCustomElement);
        } else {
            appRef.bootstrap(AppComponent);
        }
  }
}
```
4. To build the project in a single JS file, we need to tell angular to use *ngx-build-plus* module. Modify
the `angular.json` in 3 places as follows:
```json
"architect": {
    "build": { "builder": "ngx-build-plus:build" }
    "serve": { "builder": "ngx-build-plus:dev-server"}
    "test": { "builder": "ngx-build-plus:karma"}
}
```
5. Add a js file called `extra_webpack_config.js`. Here we will set the constant
   `APPLICATION` so we can tell angular whether to bootstrap the entire app or just our
   web component.
```javascript
const webpack = require('webpack');
module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'APPLICATION': 'micro'
    })
  ]
}
```
6. Run the following command to build the project into a single JS file.
`ng build --prod --output-hashing none --single-bundle true --extra-webpack-config extra_webpack_config.js`
  1. `--output-hashing none` - will avoid hashing the file names
  2. `--single-bundle true` - will bundle all compiled files into a single JS file 
7. Add dependencies and build files to the app container to load the web component
```html 
<script src="https://cdnjs.cloudflare.com/ajax/libs/zone.js/0.9.1/zone.min.js"></script>
<script type="text/javascript" src="http://localhost:8082/app.js"></script>
```
8. Note: If using JS es5, you will need this polyfill `custom-elements-es5-adapter.js` from `webcomponents` library

### Adding Angular Web Component to Angular App Container

**Steps**
1. As noted above add below scripts to the app container to load the web component
   ```html 
   <script src="https://cdnjs.cloudflare.com/ajax/libs/zone.js/0.9.1/zone.min.js"></script>
   <script type="text/javascript" src="http://localhost:8082/app.js"></script>
   ```
   * Note: You can also load these bundles dynamically using `requirejs`. However, you can only use the web component once
     the bundle has loaded. This is not a problem with `<script>` since it loads the resources before your angular app when
     not using `defer`. You can use the `customElements.whenDefined()` promise to know exactly when your web component has
     been defined.
     * Also with `requireJs`, you can use the polyfills that you include with angular since by the time you start loading
       the web components, the angular ecosystem would have already been loaded.
2. In `AppModule`, add `CUSTOM_ELEMENTS_SCHEMA` to `schemas` list in module metadata
3. If using es5 add this polyfill `custom-elements-es5-adapter.js`
4. Route all backend calls to proper web component backend
5. Add web component to app
   * Let's say you've defined a web component with the name `account-info`,
     with attributes `client-data` and it dispatches an event of type `changedAccount`,
     you can use it in an angular app like this:
   ```html
   <account-info [clientData]="dataVal" (changedAccount)="handleEvent($event)"></account-info>
   ```

### Adding Angular Web Component to React App Container
1. As noted above add below scripts to app container to load web component
   ```html 
   <script src="https://cdnjs.cloudflare.com/ajax/libs/zone.js/0.9.1/zone.min.js"></script>
   <script type="text/javascript" src="http://localhost:8082/app.js"></script>
   ```
   * Note: You can also load these bundles dynamically using `requirejs`. However, you can only use the web component once
     the bundle has loaded. This is not a problem with `<script>` since it loads the resources before your angular app when
     not using `defer`. You can use the `customElements.whenDefined()` promise to know exactly when your web component has
     been defined.
     * Also with `requireJs`, you can use the polyfills that you include with react since by the time you start loading
       the web components, the react ecosystem would have already been loaded.
   * Also, you have to set base href in `index.html` like `<base href="/">`, required by angular
2. Add web component's custom element html tag to intrinsic elements. Add types to `compileOptions.typeRoots` in `tsconfig.json`

   Create a file `webcomponent_typings.ts` and add the following namespace
   ```typescript
   declare namespace JSX {
     interface IntrinsicElements {
       [elementName: string]: any // including all elements
     }
   }
   ```
   Add it to `compilerOptions.typeRoots` in `tsconfig.json`, ex: `typeRoots: [["./src/webcomponent_typings.ts", "./node_modules/@types"]`
3. If using es5 add this polyfill `custom-elements-es5-adapter.js`
4. Route all backend calls to proper web component backend
5. Add web component to app
   * I recommend creating a wrapper for the web component to make it easier to interact
     with and to add a listener to events when the component gets created and to
     remove the listener when the component gets destroyed as shown below.
   * Let's say you've defined a web component with the name `account-info`,
     with attributes `client-data` and it dispatches an event of type `changedAccount`,
     you can create a wrapper like this
     ```typescript jsx
     class AccountInfoWrapper extends React.Component<any, any> {
        changedAccountListener: any;
        accountInfoRef: any;
        constructor(props: any) {
           super(props);
           this.accountInfoRef = React.createRef();
        }
        processEvent(evt:any) {
           evt.preventDefault();
           console.log('processing event in account-info', evt);
        }
        componentDidMount(): void {
           this.changedAccountListener = this.accountInfoRef.current.addEventListener('changedAccount', this.processEvent);
        }
        componentWillUnmount(): void {
           if (this.changedAccountListener) {
               this.accountInfoRef.current.removeListener('changedAccount', this.processEvent);
           }
        }
        render() {
           return (
               <div>
                 <account-info ref={this.accountInfoRef} client-data={JSON.stringify(this.props.data)} />
               </div>
           )
       }
     }
     export default AccountInfoWrapper;
     ```
     Note:
     * Unlike the angular container, react treats attributes by their name not their
       camelCase alternative. Also as of React 16, when you pass data as an object to an HTML element via an attribute,
       react jsx converts it to a string. However, the object must implement the `toString()` or else it will pass it as
       `[object Object]` which is why we use `JSON.stringify`.
     * This also means that if you create an angular web component and you expect it to be used by React applications, you
       must accept data as a string and then parse it back to the object
     * I think this will no longer be an issue in react 17.
     * Unlike the angular container, you have to use the native `addEventListener` function to listen to events from the
       component.
