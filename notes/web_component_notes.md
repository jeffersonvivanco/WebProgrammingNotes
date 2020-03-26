# Some notes on web components
These notes I took while reading documentation or blogs. I did not write these.

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
