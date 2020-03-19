# Angular Notes

## Template Syntax
| Type | Syntax | Category
| --- | --- | --- |

## Angular Microfrontend
* We will need a few dependencies to build and run Angular custom elements.
  * `ng add @angular/elements`
  * `ng add ngx-build-plus`

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

Steps
1. Add component/components that you wish to create custom element to `entryComponents` list in `AppModule`
2. Remove `AppComponent` from `bootstrap` list in `AppModule`
3. Add the following to `AppModule` class
```ts
export class AppModule {
    constructor(private injector: Injector) {}  
    ngDoBootstrap() {
        const myCustomElement = createCustomElement(BookingComponent, { injector: this.injector });
        customElements.define('app-flight-booking', myCustomElement);
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
5. Run the following command to build the project into a single JS file.
`ng build --prod --output-hashing none --single-bundle true`
  1. `--output-hashing none` - will avoid hashing the file names
  2. `--single-bundle true` - will bundle all compiled files into a single JS file 
6. Add dependencies and build files to another project and test it
```html 
<script src="https://cdnjs.cloudflare.com/ajax/libs/zone.js/0.9.1/zone.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.2.10/custom-elements-es5-adapter.js"></script>
<script type="text/javascript" src="http://localhost:8081/main.js"></script>
<script type="text/javascript" src="http://localhost:8082/main.js"></script>
</body>
```

## Angular Animations
### Getting Started
1. Import `BrowserAnimationsModule`
2. Import animation functions into component files
```ts
import { Component, HostBinding } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
```
3. Add the animation metadata property
```ts
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  animations: [
    // animation triggers go here
  ]
})
```
4. Animating a simple transition
```ts
animations: [
  trigger('openClose', [
    /*
    state(): use this function to define different states to call at the end of each transition.
    This function takes 2 arguments, a unique name like open or closed and a style() function

    style(): use this function to define a set of styles to associate with a given state name

    transition(): to make the change less abrupt, we need to define an animation transition to 
    specify the changes that occur between one state and another over a period of time. This 
    function accepts 2 arguments, the frist argument accepts an expression that defines the direction
    between two transition states, and the second argument accepts an animate() function.

    animate(): use this function to define the length, delay, and easing of a transition, and to
    desginate the style function for defining styles while transitions are taking place. You can
    also use this function to define the keyframes() for multistep animations. These definitions are
    placed in the second argument of the animate(). animate('duration delay easing')

    Some additional notes on using styles within state and transitions functions
    * Use state() to define styles that are applied at the end of each transition, they persist after
    the animation has completed.
    * Use transition() to define intermediate styles, which create the illusion of motion during the
    animation.
    * When animations are disabled, transition() styles can be skipped, but state() styles can't
    * You can include multiple state pairs within the same transition() argument 
    ex: transition('on => off, off => void')

    trigger(): an animation requires a trigger, so that it knows when to start. This function collects
    the states and transitions, and gives the animation a name, so that you can attach it to the triggering
    element in the HTML template. This function describes the property name to watch for changes. When a
    change occurs, the trigger initiates the actions included in its definition. These actions can be
    transitions or other functions.
    */
    state('open', style({
      height: '200px',
      opacity: 1,
      backgroundColor: 'yellow'
    })),
    state('closed', style({
      height: '100px',
      opacity: .5,
      backgroundColor: 'green'
    })),
    transition('open => closed', [animate('1s')]),
    transition('closed => open', [animate('0.5s')])
  ])
]
```
5. Attach trigger to element `<div [@triggerName]="expression">...</div>`. For elements entering or leaving
the a page (inserted or removed from the DOM), you can make the animations conditional. For example, use `*ngIf`
with the animation trigger in the HTML template.

## Angular CLI Builders
A number of Angular CLI commands run a complex process on your code, such as linting, building, or testing. The commands
use an internal tool called Architect, to run *CLI builders*, which apply another tool to accomplish the desired task.
With Angular 8, the CLI Builder API is stable and available to developers who want to customize the Angular CLI by adding
or modifying commands. For example, you could supply a builder to perform an entirely new task, or to change which 3rd party
tool is used by an existing command.

### CLI Builders
The internal Architect tool delegates work to handler functions called *builders*. A builder handler function receives
2 arguments, a set of input `options` (a JSON object), and a `context` (a `BuilderContext` object).

## Deployment

### Deferential Loading
