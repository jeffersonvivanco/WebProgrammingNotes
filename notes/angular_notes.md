# Angular Notes

## Angular Concepts
The architecture of an Angular application relies on certain fundamental concepts. The basic building
blocks are *NgModules*, which provide compilation context for *components*. NgModules collect related
code into functional sets, an Angular app is defined by a set of NgModules. An app always has at least
a *root module* that enables bootstrapping, and typically has many more *feature modules*.

* Components define *views*, which are sets of screen elements that Angular can choose among and modify
  according to your program logic and data.
* Components use *services*, which provide specific functionality not directly related to views. Service
  providers can be *injected* into components as *dependencies*, making your code modular, reusable, and
  efficient.
  
Both components and services are simply classes, with *decorators* that mark their type and provide metadata
that tells Angular how to use them.

## Components & Templates

### Displaying Data

* Choosing the template source
  * By default, the angular CLI command `ng g c` generates components with a template file. You can override that by
    adding the `-t` option
    
### Template Syntax

#### HTML in templates
The `<script>` element is forbidden, eliminating the risk of script injection attacks. In practice, `<script>` is ignored
and a warning appears on the console.

#### Binding syntax: an overview

![binding syntax overview](./assets/bindingSyntax.png "binding syntax overview")

Every public member of a **source** directive is automatically
available for binding.

##### Data-binding and HTML
Data binding works with *properties* of DOM elements, components, and directives, not HTML *attributes*.

##### HTML attribute vs DOM property
**Attributes are defined by HTML. Properties are accessed from DOM nodes.**
* A few HTML attributes have 1:1 mapping to properties, for example `id`.
* Some HTML attributes don't have corresponding properties, for example, `aria-*`.
* Some DOM properties don't have corresponding attributes, for example `textContent`

In Angular, the only role of HTML attributes is to initialize element and directive state.
**Template binding works with _properties_ and _events_, not _attributes_**.

#### Binding types and targets
![binding types and targets](./assets/bindingTypesAndTargets1.png "binding types and targets")
![binding types and targets](./assets/bindingTypesAndTargets2.png "binding types and targets")

#### Attribute, class and style bindings
##### Attribute binding
Set the value of an attribute directly with an attribute binding. This is the only exception to the rule that
a binding sets a target property and the only binding that creates and sets an attribute.

Attribute binding syntax resembles property binding, but instead of an element property between brackets, start with
the prefix `attr`, followed by a dot `.` and the name of the attribute. You then set the attribute value, using an
expression that resolves to a string, or remove the attribute when the expression resolves to `null`.

##### Class binding
You can also add and remove CSS class names from an element's `class` attribute with a **class binding**.
![class binding](./assets/classBinding.png "class binding")

##### Style binding
![style binding](./assets/styleBinding.png "style binding")

##### Style precedence
The more specific a class or style binding is, the higher its precedence. A binding to a specific class ex `[class.foo]`
will take precedence over a generic `[class]` binding, same with style. Directive host bindings are considered less
specific because directives can be used in multiple locations, so they have a lower precedence than template bindings.
In addition, bindings take precedence over static attributes.

##### Delegating to styles with lower precedence
It is possible for higher precedence styles to 'delegate' to lower precedence styles using `undefined` values. Whereas
setting a style property to `null` ensures the style is removed, setting it to `undefined` will cause Angular to fall
back to the next-highest precedence binding to that style.

#### Event binding `(event)`
Event binding allows you to listen for certain events such as keystrokes, mouse movements, clicks, and touches.

##### Target event
ex: `<button (click)="onSave($event)>Save</button>` or `<button on-click="onSave($event)"></button`

##### $event and event handling statements
The target event determines the shape of the $event object. If the target event is a native DOM element event, then
$event is a DOM event object, with properties such as `target` and `target.value`.

#### Two Way binding `[(...)]`
Two-way binding gives your app a way to share data between a component and its template.

##### Basics of two-way binding
2-way binding does 2 things:
1. Sets a specific element property
2. Listens for an element change event

Angular offers a special *2-way data binding* syntax for this purpose, `[()]`. The `[()]` syntax combines the brackets
of property binding `[]`, with the parenthesis of event binding, `()`.

The `[()]` syntax is easy to demonstrate when the element has a settable property called `x` and a corresponding event
named `xChange`. Ex: `[(x)]="someValue"`. The 2-way binding syntax is really just syntactic sugar for a *property* binding
and an *event* binding.

#### Built-in structural directives

##### NgFor

###### NgFor with `index`
The `index` property of the `NgFor` directive context returns the zero-based index of the item in each iteration. You
can capture the `index` in a template input variable and use it in the template. ex: `let item of items; let i=index`

###### NgFor with `trackBy`
If you use NgFor with large lists, a small change to 1 item, such as removing or adding an item, can trigger a cascade
of DOM manipulations. For example, re-querying a server could reset a list with all new item objects, even when those
items were previously displayed. In this case, Angular sees only a fresh list of new object references and has no choice
but to replace the old DOM elements with all new DOM elements.

You can make this more efficient with `trackBy`. Add a method to the component that returns the value NgFor should track.
ex: `trackByItems(index: number, item: Item): number { return item.id; }`, and then in html `<div *ngFor="let item of items; trackBy: trackByItems">`

##### NgSwitch
NgSwitch is like the JS `switch` statement. NgSwitch is actually a set of 3, cooperating directives: NgSwitch, NgSwitchCase,
and NgSwitchDefault as in the following example. ex:

```html
<div [ngSwitch]="currentItem.feature">
  <app-stout-item *ngSwitchCase="'stout'" [item]="currentItem"></app-stout-item>
  <app-device-item *ngSwitchCase="'slim" [item]="currentItem"></app-device-item>
  <app-unknown-item *ngSwitchDefault [item]="currentItem"></app-unknown-item>
</div>
```

NgSwitch is the controller directive. Bind it to an expression that returns the *switch value* such as feature. Though
the feature value in this example is a string, the switch value can be of any type.

#### Template reference variables (`#var`)
A **template reference variable** is often a reference to a DOM element within a template. It can also refer to a directive
(which contains a component), an element, TemplateRef or a web component.

##### Template reference variable considerations
A template *reference* variable (`#phone`) is not the same as a template *input* variable (`let phone`) such as in an
`*ngFor`. The scope of a reference variable is the entire template. So, don't define the same variable name more than once
in the same template as the runtime value will be unpredicatable.

##### Alternative syntax
You can use the `ref-` prefix alternative to `#`. ex: 
```angular2html
<input ref-fax placeholder="fax number" />
<button (click)="callFax(fax.value)"></button>
```

#### `@Output()` and `@Input()`
* OnChanges and `@Input()` - to watch for changes on an `@Input()` property, use OnChanges.

#### Template expression operators

##### The safe navigation operator `(?)` and null property paths
The Angular safe navigation operator, `?`, guards against `null` and `undefined` values in property paths. 
ex: `<p>The item name is {{item?.name}}</p>`

##### The non-null assertion operator `(!)`
As of typescript 2.0, you can enforce strict null checking with the `--strictNullChecks` flag. TS then ensures that no
variable in unintentionally `null` or `undefined`. In this mode, typed variables disallow `null` and `undefined` values
by default. The type checker throws an error if you leave a variable unassigned or try to assign `null` or `undefined`
to a variable whose type disallows `null` and `undefined`. The type checker also throws an error if it can't determine
whether a variable will be `null` or `undefined` at runtime. You tell the type checker not to throw an error by applying
the postfix non-null assertion operator, `!`. ex: `<p>The item's color is {{item.color!.toUpperCase()}}</p>`

#### Built-in template functions

##### The `$any()` type cast function
Sometimes a binding expression triggers a type error during AOT compilation and it is not possible or difficult to fully
specify the type. To silence the error, you can use `$any()` cast function to cast the expression to the `any` type.
ex: `<p>The item's undeclared best by date is: {{$any(item).bestByDate}}</p>`

The `$any()` cast function also works with `this` to allow access to undeclared members of the component.

#### SVG in templates
When you use an SVG as a template, you are able to use directives and bindings just like with HTML templates. This means
that you'll be able to dynamically generate interactive graphics.
### User Input
#### Get user input from the `$event` object
ex:
```angular2html
<input (keyup)="onKey($event)">
<p>{{values}}</p>
```
When a user presses and releases a key, the `keyup` event occurs, and Angular provides a corresponding DOM
event object in the `$event` variable which this code passes as a parameter to the component's `onKey()` method.
To get the key value of the event => `$event.key`, value of the target => `$event.target.value`

The properties of an `$event` object vary depending on the type of DOM event. For example, a mouse event includes
different information than an input box editing event.

All standard DOM event objects have a `target` property, a reference to the element that raised the event.

##### Type the `$event`
```typescript
export class KeyUpComponent_v1 {
  values = '';


  onKey(event: KeyboardEvent) { // with type info
    this.values += (event.target as HTMLInputElement).value + ' | ';
  }
}
```
The `$event` is now a specific `KeyboardEvent`. Not all elements have a value property so it casts `target` to an input
element. The `OnKey` method more clearly expresses what it expects from the template and how it interprets the event.

##### Passing `$event` is a dubious practice
Typing the event object reveals a significant objection to passing the entire DOM event into the method: the component
has too much awareness of the template details. It can't extract information without knowing more than it should about
the HTML implementation. The breaks the separation of concerns between the template (what the user sees) and the component
(how the application processes the user data).

#### Get user input from a template reference variable
There's another way to get user data: use Angular template reference variables. These variables provide direct access
to an element from within the template.
```typescript
@Component({
  selector: 'app-loop-back',
  template: `
    <input #box (keyup)="0">
    <p>{{box.value}}</p>
  `
})
export class LoopbackComponent { }
```
The template reference variable named `box`, declared on the `<input>` element, refers to the `<input>` element itself.
The template is completely self contained. It doesn't bind to the component, and the component does nothing.

##### This won't work at all unless you bind to an event
Angular updates the bindings (and therefore the screen) only if the app does something in response to asynchronous events,
such as keystrokes. This example code binds the `keyup` event to the number 0, the shortest template statement possible.
While the statement does nothing useful, it satisfies Angular's requirement so that Angular will update the screen.

#### Key event filtering (with `key.enter`)
The `(keyup)` event handler hears every keystroke. Sometimes only the `Enter` key matters, because it signals that the
user has finished typing. One way to reduce the noise would be to examine every `$event.keyCode` and take action only when
the key is `Enter`.

There's an easier way: bind to Angular's `keyup.enter` pseudo-event.

#### On blur
The component's `value` property is updated only when the user presses Enter. To fix this issue, listen to both the
Enter key and the blur event.
### Attribute directives
An **attribute** directive changes the appearance or behavior of a DOM element.

There are 3 kinds of directives in Angular:
1. Components-directives with a template
2. Structural directives-change the DOM layout by adding and removing DOM elements. ex: NgFor, NgIf
3. Attribute directives-change the appearance or behavior of an element, component, or another directive. ex: NgStyle

#### Built a simple attribute directive
1. Generate a directive `ng g directive highlight`. Directives must be declared in Angular modules in the same manner
   as components.
   
   The generated `highlight.directive.ts` is as follows:
   ```ts
   import { Directive } from '@angular/core';
   
   @Directive({
     selector: '[appHighlight]'
   })
   export class HighlightDirective {
     constructor() { }
   }
   ```
   The `@Directive` decorator's lone configuration property specifies the directive's CSS attribute selector, `[appHighlight]`.
   Its the brackets (`[]`) that make it an attribute selector. Angular locates each element in the template that has
   an attribute named `appHighlight` and applies the logic of this directive to that element. The *attribute selector*
   pattern explains the name of this kind of directive.
   
   
### Dynamic Components

## Dependency Injection
Dependencies are services or objects that a class needs to perform its function. DI is a coding pattern in which a class
asks for dependencies from external sources rather than creating them itself.

### Create and register an injectable service
The DI framework lets you supply data to a component from an injectable *service* class, define in its own file.

Having multiple classes in the same file can be confusing. We generally recommend that you define components and services
in separate files. If you do combine a component and service in the same file, it is important to define the service first,
and then the component. If you define the component before the service, you get a run-time null reference error. It is
possible to define the component first with the help of the `forwardRef()` method. You can also use forward references
to break circular dependencies.

#### Forward references in Angular
```typescript
class AppComponent {
  name: string;

  constructor(@Inject(forwardRef(() => NameService)) nameService) {
    this.name = nameService.getName();
  }
}
```
What `forwardRef` does is, it takes a function as a parameter that returns a class. And because this function isn't
immediately called but instead is called *after* `NameService` is declared it is safe to return `NameService` from it.
In other words: At this point where `() => NameService` runs `NameService` isn't undefined anymore.

#### Create a service class
`ng g s service_name`

```typescript
import { Injectable } from '@angular/core';
import { HEROES } from './mock-heroes';

@Injectable({
  // we declare that this service should be created
  // by the root application injector.
  providedIn: 'root',
})
export class HeroService {
  getHeroes() { return HEROES; }
}
```

##### Configure an injector with a service provider
The class we have created provides a service. The `@Injectable()` decorator marks it as a service that can be injected, but
Angular can't actually inject it anywhere until you configure an Angular dependency injector with a provider of that service.
The injector is responsible for creating service instances and injecting them into classes. You rarely create an Angular
injector yourself. Angular creates injectors for you as it executes the app, starting with the *root injector* that it creates
during the bootstrap process.

A provider tells an injector *how to create the service*. You must configure an injector with a provider before that injector
can create a service (or provide any kind of dependency).

A provider can be the service class itself, so that the injector can use `new` to create an instance. You might also define
more than one class to provide the same service in different ways, and configure different injectors with different providers.

Injectors are inherited, which means that if a given injector can't resolve a dependency, it asks the parent injector to
resolve it. A component can get services from its own injector, from the injectors of its component ancestors, from the
injector of its parent NgModule, or from the `root` injector.

You can configure injectors with providers at different levels of your app, by setting a metadata value in one of 3 places:
* In the `@Injectable()` decorator for the service itself.
  * Has the `providedIn` metadata option, where you can specify the provider of the decorated service class with the `root`
    injector, or with the injector for a specific NgModule.
* In the `@NgModule()` decorator for an NgModule.
  * Has the `providers` metadata option, where you can configure providers for NgModule-level or component-level injectors.
* In the `@Component()` decorator for a component.
  * Has the `providers` metadata option, where you can configure providers for NgModule-level or component-level injectors.
  
Components are directives, and the `providers` option is inherited from `@Directive()`. You can also configure providers
for directives and pipes at the same level as the component.

### Injecting Services

#### Injector hierarchy and service instances
Services are singletons *within the scope of an injector*. That is, there is at most one instance of a service in a given
injector. There is only one `root` injector for an app. 

Angular DI has a hierarchical injection system, which means that nested injectors can create their own service instances.
Angular regularly creates nested injectors. Whenever Angular creates a new instance of a component that has `providers` specified
in `@Component()`, it also creates a new *child injector* for that instance. Similarly, when a new NgModule is lazy-loaded
at run time, Angular can create an injector for it with its own providers.

Child modules and component injectors are independent of each other, and create their own separate instances of the provided
services. When Angular destroys an NgModule or component instance, it also destroys that injector and that injector's
service instances.

Thanks to injector inheritance, you can still inject application-wide services into these components. A component's injector
is a child of its parent component's injector, and inherits from all ancestor injectors all the way back to the application's
*root* injector. Angular can inject a service provided by any injector in that lineage.

### Testing components with dependencies
Designing a class with dependency injection makes the class easier to test. Listing dependencies as constructor parameters
may be all you need to test application parts effectively.

For example, you can create a new `HeroListComponent` with a mock service that you can manipulate under test.
```typescript
const expectedHeroes = [{name: 'A'}, {name: 'B'}]
const mockService = <HeroService> {getHeroes: () => expectedHeroes }

it('should have heroes when HeroListComponent created', () => {
  // Pass the mock to the constructor as the Angular injector would
  const component = new HeroListComponent(mockService);
  expect(component.heroes.length).toEqual(expectedHeroes.length);
});
```

### Services that need other services
When angular creates a class whose constructor has parameters, it looks for type and injection metadata about those parameters
so that it can inject the correct service. If angular can't find the parameter information, it throws an error. Angular
can only find the parameter information *if the class has a decorator of some kind*. The `@Injectable()` decorator is the
standard decorator for service classes.

The decorator requirement is imposed by Typescript. Typescript normally discards parameter type information when it transpiles
the code to Javascript. Typescript preserves this information if the class has a decorator and the `emitDecoratorMetadata` compiler
option set to `true` in Typescript's `tsconfig.json` configuration file. The CLI configures `tsconfig.json` with `emitDecoratorMetadata: true`.
This means you are responsible for putting `@Injectable()` on your service classes.

#### Dependency Injection Tokens
When you configure an injector with a provider, you associate that provider with a DI token. The injector maintains an
internal *token-provider* map that it references when asked for a dependency. The token is the key to the map. In simple
examples, the dependency value is an *instance*, and the class *type* serves as its own lookup key. 

Many dependency values are provided by classes, but not all. The expanded *provide* object lets you associate different
kinds of providers with a DI token.

#### Optional dependencies
When a component or service declares a dependency, the class constructor takes that dependency as a parameter. You can
tell angular that the dependency is optional by annotating the constructor parameter with `@Optional()`.
```typescript
constructor(@Optional() private logger?: Logger) {
  if (this.logger) {
    this.logger.log(someMessage);
  }
}
```
When using `@Optional()`, your code must be prepared for a null value. If you don't register a logger provider anywhere,
the injector sets the value of `logger` to null. `@Inject()` and `@Optional()` are *parameter decorators*. They alter
the way the DI framework provides a dependency, by annotating the dependency parameter on the constructor of the class
that requires the dependency.

## Routing & Navigation
### `<base href>`
If you are working without the cli, make sure that you have `<base href="/">` in the `<head>` of your index.html file.
This assumes that the app folder is the application root, and uses "/".

### Generate an app with routing enabled
`ng new routing-app --routing`

### Getting route info
You can use a route to pass information to your app components. To do so, you use the `ActivatedRoute` interface.
Ex, if you inject `private route:ActivatedRoute` into your component then you can do
```js
this.route.queryParams.subscribe(params => {
  console.log(params['name']);
});
```
To pass query params, either pass them through the value `[queryParams]` if using `routerLink` or
through the `NavigationExtras` object when calling `navigate()`

### Using relative paths
Relative paths allow you to define paths that are relative to the current URL segment. You can use the `../` notation
to go up a level. You can also use `./` or no leading slash to specify the current level.

Always specify the complete absolute path when calling router's `navigateByUrl()` method.

#### Specifying a relative route
To specify a relative route, use the `NavigationExtras` `relativeTo` property. After the link parameters array add an
object with the `relativeTo` property set to the `ActivatedRoute`, which is `this.route`.

### Accessing query parameters and fragments
First, inject the activated route service, `constructor(private route: ActivatedRoute)`. Here's an example where we get
the `id` param.
```js
this.route.paramMap.pipe(
  switchMap(params => {
    this.selectedId = Number(params.get('id'));
    return this.service.getHeroes();
  })
)
```
If you don't want to use an observable, you can do this: `this.route.snapshot.paramMap.get('id')`.

To pass params to route use: `this.router.navigate(['/heroes', {id: itemId}]);`

### Lazy Loading
You can configure your routes to lazy load modules, which means that Angular only loads modules as needed, rather than
loading all modules when the app launches. Additionally, you can preload parts of your app in the background to improve
the user experience.

### Preventing unauthorized access
Use route guards to prevent users from navigating to parts of an app without authorization. The following route guards
are available in Angular:
* `CanActivate` to mediate navigation to a route.
* `CanActivateChild` to mediate navigation to a child route.
* `CanDeactivate` to mediate navigation away from the current route.
* `Resolve` to perform route data retrieval before route activation.
* `CanLoad` to mediate navigation to a feature module loaded asynchrnously.

To use route guards, consider using component-less routes as this facilitates guarding child routes.

Create a service for your guard: `ng g guard your-guard`. In your guard class, implement the guard you want to use. For
example
```ts
export class YourGuard implements CanActivate {
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // your logic goes here
  }
}
```
In your routing module, use the appropriate property in your `routes` configuration.
```js
routes = [{
  path: '/your-path',
  component: YourComponent,
  canActivate: [YourGuard]  
}]
```

You need to control access to different parts of your app for various reasons. Some of which may include the following:
* Perhaps the user is not authorized to navigate to the target component.
* Maybe the user must login (authenticate) first.
* Maybe you should fetch some data before you display the target component.
* You might want to save pending changes before leaving a component.
* You might ask the user if it's OK to discard pending changes rather than save them.

You add guards to the route configuration to handle these scenarios.

A guard's return value controls the router's behavior:
* If it returns `true`, the navigation process continues.
* If it returns `false`, the navigation process stops and the user stays put.
* If it returns a `UrlTree`, the current navigation cancels and a new navigation is initiated to the `UrlTree` returned.

The guard can also tell the router to navigate elsewhere, effectively cancelling the current navigation. When doing so
inside a guard, the guard should return `false`.

The guard might return its boolean answer synchronously. But in many cases, the guard can't produce an answer synchronously.
The guard could ask the user a question, save changes to the server, or fetch fresh data. These are all asynchronous operations.
Accordingly, a routing guard can return an `Observable<boolean>` or a `Promise<boolean>` and the router will wait for the
observable to resolve to `true` or `false`. The observable provided to the `Router` must also complete. If the observable
does not complete, the navigation does not continue.

### Register `Router` and `Routes`
In order to use the `Router`, you must first register the `RouterModule` from the `@angular/router` package. Define an
array of routes and pass them to the `RouterModule.forRoot()` method. The `RouterModule.forRoot()` method returns a module
that contains the configured `Router` service provider, plus other providers that the routing library requires. Once the
application is bootstrapped, the `Router` performs the initial navigation based on the current browser URL. The 
`RouterModule.forRoot()` method is a pattern used to register application-wide providers. 

### Feature Module's routes
Only call `RouterModule.forRoot()` in the root `AppRoutingModule`. In any other module, you must call the 
`RouterModule.forChild()` method to register additional routes.

### Observable `paramMap` and component reuse
By default, the router re-uses a component instance when it re-navigates to the same component type without
revisiting a different component first. The route parameters could change each time.

### `snapshot:` the no-observable alternative
When you know for certain that a component instance will never be re-used, you can use `snapshot`.
`route.snapshot` provides the initial value of the route parameter map. You can access the params directly
without subscribing or adding observable operators as int he following: `this.route.snapshot.paramMap.get('id')`.
`snapshot` only gets the initial value of the parameter map with this technique. Use the observable `paramMap`
approach if there's a possibility that the router could re-use the component.

### Route parameters: Required or optional?
Use route parameters to specify a required parameter value within a route URL. You can also add optional information
to a route request. Optional paramters aren't involved in pattern matching and afford flexibility of expression.
Define optional parameters in a separate object after you define the required route parameters. In general, use a
required route parameter when the value is mandatory (for example, if necessary to distinguish one route path from
another); and an optional paramter when the value is optional, complex, and/or multivariate.

The optional route parameters are not separated by "?" adn "&" as they would be in the URL query string. They are
separated by semicolons ";". This is matrix URL notation. Matrix URL notation is an idea first introduced in a
1996 proposal by the founder of the web, Tim Berners-Lee. Although matrix notation never made it into the HTML
standard, it is legal and it became popular among browser routing systems as a way to isolate parameters belonging
to parent and child routes. As such, the Router provides support for the matrix notation across browsers.

### Adding routable animations
1. Import the `BrowserAnimationsModule`
2. Add a `data` object to the routes. Transitions are based on `states` and you use the `animation` data from
   the route to provide a named `animation` state for the transitions.
   ex: `{ path: 'heroes',  component: HeroListComponent, data: { animation: 'heroes' } }`
3. Create an `animations.ts` file.
  
   ```typescript
   import {
     trigger, animateChild, group,
     transition, animate, style, query
   } from '@angular/animations';
   
   
   // Routable animations
   export const slideInAnimation =
     trigger('routeAnimation', [
       transition('heroes <=> hero', [
         style({ position: 'relative' }),
         query(':enter, :leave', [
           style({
             position: 'absolute',
             top: 0,
             left: 0,
             width: '100%'
           })
         ]),
         query(':enter', [
           style({ left: '-100%'})
         ]),
         query(':leave', animateChild()),
         group([
           query(':leave', [
             animate('300ms ease-out', style({ left: '100%'}))
           ]),
           query(':enter', [
             animate('300ms ease-out', style({ left: '0%'}))
           ])
         ]),
         query(':enter', animateChild()),
       ])
     ]);
   ```
4. Add an `animations` array to the `@Component` metadata that contains the `slideAnimation`.
5. In order to use the routable animations, wrap the `RouterOutlet` inside an element, use the
   `@routeAnimation` trigger, and bind it to the element.
6. For the `@routeAnimation` transitions to key off states, provide it with the `data` from the
   `ActivatedRoute`. The `RouterOutlet` is exposed as an `outlet` template variable, so you bind
   a reference to the router outlet. ex:
   ```html
   <div [@routeAnimation]="getAnimationData(routerOutlet)">
     <router-outlet #routerOutlet="outlet"></router-outlet>
   </div>
   ```
7. The `@routeAnimation` property is bound to the `getAnimationData()` with the provided `routerOutlet`
   reference, so the next step is to define that function in the `AppComponent`. The `getAnimationData()`
   function returns the animation property from the `data` provided through `ActivatedRoute`. The `animation`
   property matches the `transition` names you used in the `slideInAnimation` defined in `animations.ts`.
   ```typescript
   export class AppComponent {
     getAnimationData(outlet: RouterOutlet) {
       return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
     }
   }
   ```
   
   
### `RouteReuseStrategy`
Provides a way to customized when activated routes get reused. To use, extend the class and override methods.
Then add your new class to the `providers` list like:
```js
{
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: YourClass
    }
  ]
}
```

### Displaying multiple routes in named outlets
A template can also have any number of named outlets. Each named outlet has its own set of routes with their own components.
Multiple outlets can display different content, determined by different routes, all at the same time.
`<router-outlet name="popup"></router-outlet>`

To clear the route `this.router.navigate([{outlets: {popup: null}}]);`

In the route def, specify the outlet with the `outlet` property.

To navigate to the route `<a [routerLink]="[{ outlets: { popup: ['compose'] } }]">Contact</a>`

The `outlets` object within an outer object was unnecessary when there was only one route and one unnamed outlet. The
router assumed that your route specification targeted the unnamed primary outlet and created these objects for you. Routing
to a named outlet has revealed a router feature: you can target multiple outlets with multiple routes in the same
`RouterLink` directive.

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
```

### Angular Application bootstrapped in a custom element
This approach is different because it creates a custom element and on `connectedCallback` it
bootstraps the application and renders the main component. On the `disconnectedCallback`, it
destroys the application platform (all modules and services). This approach will give you
a clean app every time you render the custom element. Recommended only if the **entire** app
represents a web component. To use one app to develop multiple web components, follow the approach
above. 

#### Steps
1. `ng add ngx-build-plus` and follow the steps above relevant to ngx-build-plus
2. Instead of creating a custom element in `app.module.ts`, we are going to bootstrap the main component.
   You can add the component to the `bootstrap` list in the metadata of `AppModule` or you can implement
   the `ngDoBootstrap(appRef: ApplicationRef)` method.
3. In `main.ts` we define the class for our web component and we use the `customElements.define()` to
   define custom element.
   
   ```typescript
   // Class that will be provided as a service to components to access any data from the
   // custom element's attributes or events.
   export class ProvidedData {
     constructor(public data, public parentNgZone: NgZone) {}
   }
   
   function init(standalone: boolean, data?: ProvidedData) {
     const pref: any = data ? platformBrowserDynamic([{provide: ProvidedData, useValue: data}]) : platformBrowserDynamic();
     if (!standalone && data && data.parentNgZone) {
       data.parentNgZone.runOutsideAngular(() => {
         pref.bootstrapModule(AppModule)
           .catch(err => console.error(err));
       });
     } else {
       pref.bootstrapModule(AppModule)
         .catch(err => console.error(err));
     }
     pref.onDestroy(() => {
       console.log('platform destroying...');
     });
     return pref;
   }
   
   class CustomPlaygroundWeb extends HTMLElement {
     pref;
     _data;
     _parentNgZone;
     constructor() {
       super();
     }
     set data(data) {
       console.log('data provided to component', data);
       this._data = data;
       this.render();
     }
     // If the parent app is another angular app then we want to run the
     // bootrstrap code outside of the parent's angular cause the parent
     // doesn't need to keep watch on the child app. The child app will
     // create its own ngZone and detect changes.
     set parentNgZone(ngZone: NgZone) {
       console.log('parents ngZone provided', ngZone);
       this._parentNgZone = ngZone;
       this.render()
     }
     connectedCallback() {
       const div = document.createElement('app-playground-web');
       this.appendChild(div);
     }
     disconnectedCallback() {
       if (this.pref) this.pref.destroy();
       console.log('destroying web component');
     }
     render() {
       if (!this._data || !this._parentNgZone) return;
       if (this.pref) this.pref.destroy();
       this.pref = init(false, new ProvidedData(this._data, this._parentNgZone));
     }
   }
   customElements.define('playground-web', CustomPlaygroundWeb);
   init(true);
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

## NgZone
A zone is an execution context that persists across async tasks. You can think of it as thread-local storage for JS VMs.

### Fundamentals of change detection
#### When apps update HTML
Angular runs change detection when it detects that data could have changed. The result of change detection is that the
DOM is updated with new data. Angular detects the changes in different ways. For component initialization, Angular calls
change detection explicitly. For asynchronous operations, Angular uses a zone to detect changes in places where the data
could have possibly mutated and it runs change detection automatically.

### Zone and execution contexts
A zone provides an execution context that persists across async tasks. Execution context is an abstract concept that holds
information about the environment within the current code being executed. Consider the following example:

```js
const callback = function() {
  console.log('setTimeout callback context is', this);
}
const ctx1 = { name: 'ctx1'};
const ctx2 = { name: 'ctx2'};
const func = function() {
  console.log('caller context is', this);
  setTimeout(callback);
}
func.apply(ctx1);
func.apply(ctx2);
```

The value of `this` in the callback of `setTimeout()` might differ depending on when `setTimeout()` is called. Thus, you
can lose the context in asynchronous operations.

A zone provides a new zone context other than `this`, the zone context that persists across async operations. In the following
example, the new zone context is called `zoneThis`.

```js
zone.run(() => {
  // now you are in a zone
  expect(zoneThis).toBe(zone);
  setTimeout(function() {
    // the zoneThis context will be the same zone when the setTimeout is scheduled
    expect(zoneThis).toBe(zone);
  })
});
```

The new context, `zoneThis`, can be retrieved from the `setTimeout()` callback function, and this context is the same
when the `setTimeout()` is scheduled. To get the context, you can call `Zone.current`.

### NgZone
While Zone.js can monitor all states of sync and async operations, Angular additionally provides a service called NgZone.
This service creates a zone named `angular` to automatically trigger change detection when the following conditions are
satisfied:
1. When a sync or async function is executed.
2. When there is no `microtask` scheduled.

#### NgZone `run()` and `runOutsideOfAngular()`
Zone handles most async APIs such as `setTimeout()`, `Promise.then()` and `addEventListener()`, ... etc. Therefore in
those async APIs, you don't need to trigger change detection manually.

There are still some 3rd party APIs that Zone does not handle. In those cases, the `NgZone` service provides a `run()`
method that allows you to execute a function inside the angular zone. This function, and all async operations in that
function, trigger change detection automatically at the correct time.

By default, all async operations are inside the angular zone, which triggers change detection automatically. Another
common case is when you don't want to trigger change detection. In that situation, you can use another `NgZone` method:
`runOutsideAngular()`.






















 

