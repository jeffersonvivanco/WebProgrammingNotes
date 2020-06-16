# Some notes on web components
These notes I took while reading documentation or blogs. I did not write these.

## Web Components
Web Components - is a suite of different technologies allowing you to create resuable custom elements--with their 
functionality encapsulated away from the rest of your code--and utilize them in your web apps.

* It consists of 3 main technologies, which can be used together to create versatile custom elements with encapsulated 
  functionality that can be reused wherever you like without fear of code collisions.
  
### Custom Elements
A set of JS APIs that allow you to define custom elements and their behavior, which can be used as desired in your user
interface.

* There are two types of custom elements:
  * **Autonomous custom elements** - are standalone--they dont inherit from standard HTML elements. You use these on a 
    page by literally writing them out as an HTML element. For example `<popup-info>` or `document.createElement('popup-info')`. 
    Autonomous nearly always extend `HTMLELement`.
  * **Customized built-in elements** - inherit from basic HTML elements. To create one of these, you have to specify 
    which element they extend, and they are used by writing out the basic element but specifying the name of the custom 
    element in the `is` attribute. For example `<p is="word-count">`, or `document.createElement('p', {is: 'word-count'})`.
    
* `window.customElements` - returns a reference to the `CustomElementsRegistry` object

#### CSS pseudo-classes

* `:defined` - Matches any element that is defined, including built-in elements and custom elements defined with 
  `CustomElementRegistry.define()`
* `:host` - Selects the shadow host of the Shadow DOM containing the CSS it is used inside
* `:host()` - Selects the shadow host of the shadow DOM containing the CSS it is used inside (so you can select a custom 
  element from inside its shadow DOM)--but only if the selector given as the function's parameter matches the shadow host.
* `:host-context()` - Selects the shadow host of the Shadow DOM containing the CSS it is used inside (so you can select 
  the custom element from inside its shadow DOM)--but only if the selector given as the function's parameter matches 
  the shadow host's ancestor(s) in the place it sits inside the DOM hierarchy.
  
  
### Shadow DOM
A set of JS APIs for attaching an encapsulated "shadow" DOM tree to an element--which is rendered separately from the main
document DOM--and controlling associated functionality. In this way, you can keep an element's features private, so they 
can be scripted and styled without the fear of collision with other parts of the document.

* High-level view
  * DOM - a tree-like structure of connected nodes that represents the different elements and strings of text appearing 
    in a markup document
  * Shadow DOM allows hidden DOM trees to be attached to elements in the regular DOM tree--this shadow DOM tree starts 
    with a shadow root, underneath which can be attached to any elements you want, in the same way as the normal DOM.
* Basic Usage
  * You can attach a shadow root to any element using the `Element.attachShadow()` method. This takes as its parameter 
    an options object that contains one option--`mode`--with a value of `open` or `closed`.
    * `open` - means that you can access the shadow DOM using JS written in the main page context, 
      for ex: `let myShadowDom = myCustomElem.shadowRoot;`
    * `closed` - means you won't be able to access the shadow DOM from the outside
  * To attach a shadow DOM to a custom element as part of its constructor, you would do:
  
  ```js
  let shadow = this.attachShadow({mode: 'open'});
  var para = document.createElement('p');
  shadow.appendChild(para);
  ```

### HTML Templates
The `<template>` and `<slot>` elements enable you to write markup templates that are not displayed in the rendered page.
These can be reused multiple times as the basis of a custom element's structure. This element and its contents are not 
rendered in the DOM, but it can still be referenced using JS.
      
* Using templates with web components - templates are useful on their own, but they work even better with web components.
* Adding flexibility with slots - We can make it possible to display different text in each element instance in a nice 
  declarative way using `<slot>` element.
   * Slots are identified by their `name` attribute, and allow you to define placeholders in your template that can be 
     filled with any markup fragment you want when the element is used in the markup.
        
## Basic Approach for implementing a web component
1. Create a class or a function in which you specify your web component functionality.
2. Register your new custom element using the `CustomElementRegistry.define()` method, passing it the element name to be defined, the class or
function in which its functionality is specifed, and optionally, what element it inherits from.
3. If required, attach a shadow DOM to the custom element using `Element.attachShadow()` method. Add child elements, event listeners, etc., to
the shadow DOM using regular DOM methods.
4. If required, define an HTML template using `<template>` and `<slot>`. Again, use regular DOM methods to clone the template and attach it to
your shadow DOM.
5. Use your custom element wherever you like on your page, just like you would any regular HTML element.
  * Using lifecycle callbacks - you can define several different callbacks inside a custom element's class definition, which fire at different points
  in the element's lifecycle.
    * `connectedCallback` - invoked each time the custom element is appended into a document-connected element. This will happen each time the node
    is moved, and may happen before the element's contents have been fully parsed. Note: this callback may also be called once your element is no
    longer connected, use `Node.isConnected` to make sure.
    * `disconnectedCallback` - invoked each time the custom element is disconnected from the document's DOM
    * `adoptedCallback` - invoked each time the custom element is moved to a new document
    * `attributeChangedCallback` - invoked each time one of the custom element's attributes is added, removed, or changed. Which attributes to notice
    change for is specified in a static get `observedAttributes` method.

## Making apps with web components

### Patterns for designing web components
The high level goal of building an app primarily with web components is moving the app's initial configuration state out
of JSON and JS into the HTML. This simplifies the consumption of complex APIs and provides a unified interface for
components from different authors to work together.

The pattern:
* The HTML is used for configuration and sets the initial state of the page.
* Custom elements do not need to update their attributes as the user interacts with them.
* Custom elements should update their state when their attributes are changed externally using `el.setAttribute`. This
  allows us to control the elements after first render making them great for integrating into frameworks like React.
* State is maintained by each component individually and can be accessed by properties on the object. Sometimes similar
  elements need to work together and share state. Inspired by `<ul>` and `<li>` tags this is where we would make a wrapper
  element:
  ```html
  <magic-slide-wrapper>
    <magic-slider></magic-slider>
    <magic-slider></magic-slider>
    <magic-slider></magic-slider>
  </magic-slide-wrapper>
  ``` 
  In this case each `magic-slider` can fire events when it is changed or used and the `magic-slide-wrapper` can then
  maintain the group's state and handle any changes accordingly.
* They may provide methods or state information on the object itself to be used in JS.
* Inter-component messaging is handled by event listeners. In the above example `magic-slide-wrapper` can listen for
  events on all of its children.

### Advantages of web components for controlling complex APIs
We can now much more simply write HTML by hand to describe our app as each functional piece has exactly one element. All
of the extra DOM elements for functionality are hidden inside web components. So *every element on the page should have
some syntactic meaning* to the author of the app. We don't even need to use extra elements for layout because of the
powerful new layout API CSS Grid.

The combination of the two results is clear understandable HTML, which should be clear to the developer and any that may
read the code after them. The biggest benefit for end-developers who will be using your components is that all implementation
details are hidden behind the HTML. The consumer of the component doesn't really care if it queries the network or uses
WebGL or WebRTC. As long as there is a common interface the consumer can plug the elements together and they will work.

### Writing web components
When building these components we didn't jump right into making components. First we produced working prototypes of features
we wanted and got them working together. We then isolated individual pieces of functionality and wrapped them in components.

## Web Component Management

### What is a good way to include styles and templates, and deploying web components?
* One way is to use `<link rel="import">` that is only supported by Chrome but allows you to bundle CSS, `<template>`s
  and other assets needed for element.
* Another way is to have a single JS file `<script src="my-webcomponent.js"></script>` that you include in your page that
  defines and registers the custom element. The script file encapsulates the element logic, definition, and styling.
  * By including your component, the consumer of the custom element should not have uncontrolled blocking requests emanating
    from your element. If something has blocked the render, then the consumer has decided to do it. This means that there
    is not external style sheets or JS.
* Some more questions
  * What is a good way to deploy web components?
  * Is there a model for encapsulating and loading templates and styles?
  * Is it a good idea not to make any resource calls from the component?
   
   
   
   
   
## 4 reasons you should use native Web Components
1. Code is not for computers
   * Developers need to place more emphasis on writing cleaner, more semantic markup for several reasons: better performance,
     increased accessibility, and easier maintainability.
   * Native Web Components provide a lot of benefits:
     * Declaration: you can easily declare components on your page that are ready to go
     * Composability: you can compose apps using smaller chunks of code, with the Shadow DOM.
     * Reusability: you can import, use, and reuse elements in applications.
     * Maintainability: compartmentalized, reusable code is the best way to maintain code readability; it reduces overall
       app size, and simplifies debugging.
     * Extensibility: browser elements or custom web components can be extended with the custom elements API.
     * Scoping: Shadow DOM provides DOM and CSS scoping where styles don't leak out and component DOM is all local. you
       define the element API inside your component and it doesn't leak into the global scope.
     * Interoperability: native web components are interoperable at the browser's lowest level which is DOM.
     * Productivity: using already built components and iterating on top of them lets us develop faster and more productive.
     * Accessibility: by using and extending existing browser elements, the default browser accessibility comes with it.
     
2. Brand Consistency
   
   Having your frontend app code split up into component libraries or even design systems can ensure brand consistency
   through the company. It also provides an additional benefit of the ability to be used by all teams, regardless of tech
   stack.
   
3. Business Perspective

   If you're a development manager or executive, native web components save you money. Developers will have the ability
   to focus solely on making native reusable components, similar to legos, and use these blocks in other applications
   across teams. Your teams will be able to build and deploy applications much more quickly. This leads to less time
   devoted to developing new features.
   
4. Developer Experience

   From a developer's perspective, native web components help to manage the project more efficiently. The code will be
   more consumable. Code can be shared between teams more easily. And as a by-product, code quality will be improved,
   as developers can re-use existing components. Finally, apps that are using native web components reap the benefits,
   when you add a fix or add a new feature, these changes get propagated down to each instance.
   
## What are micro-frontends?
The idea behind micro frontends is to think about a website or web app as **a composition of features** which are owned 
by independent teams. Each team has a **distinct area of business or mission** it cares about and specialises in. 
A team is **cross functional** and develops its features **end-to-end, from database to user interface**.
  
### Core ideas behind Micro Frontends

* Be technology agnostic - Each team should be able to choose and upgrade their stack without having to coordinate with 
  other teams. Custom Elements are a great way to hide implementation details while providing a neutral interface to others.
* Isolate Team Code - Don't share a runtime, even if all teams use the same framework. Build independent apps that are self contained.
  Dont rely on shared state or global variables.
* Establish team prefixes - Agree on naming conventions where isolation is not possible yet. Namespace CSS, Events, Local 
  Storage, and Cookies to avoid collisions and clarify ownership.
* Favor Native Browser features over Custom APIs - Use Browser Events for communication instead of building a global 
  PubSub system. If you really have to build a cross team API, try keeping it as simple as possible.
* Build a Resilient Site - Your feature should be useful, even if JS failed or hasn't executed yet. Use Universal Rendering and Progressive
  Enhancement to improve perceived performance.
  
### The DOM is the API
Each team builds their component **using their web technology of choice and wraps it inside a Custom Element**. The DOM specification of this
particular element (tag-name, attributes, & events) acts as the contract or public API for other teams. The advantage is that they can use
the component and it functionality without having to know the implementation. They just have to interact with the DOM.

### Page Composition
beside the client and server side integration of code written in different frameworks itself, there are a lot of side topics
that should be discussed: mechanisms to isolate js, avoid css conflicts, load resources as needed, share common resources 
between teams, handle data fetching and think about good loading states for the user.

### Child-Parent or Siblings Communication
Both fragments can build some kind of internal JS API that lets one app communicate with the other.
But this would require the component instances to know each other and would also be an isolation violation. A cleaner way 
is to use the a PubSub mechanism, where a component can publish a message and other components can subscribe to specific topics. 
Luckily browsers have this feature built-in. This is exactly how browser events like `click`, `select`, or `mouseover` work. 
In addition to native events there is also the possibility to create higher level events with `new CustomEvent(...)`. 
Events are always tied to the DOM node they were created/dispatched on. Most native events also feature bubbling. 
This makes it possible to listen for all events on a specific sub-tree of the DOM. If you want to listen all events on the page, 
attach the event listener to the window element. Imperatively calling DOM methods is quite uncommon, but can be found in the
video element api for example. If possible, the use of declarative approach (attribute change) should be preferred.
