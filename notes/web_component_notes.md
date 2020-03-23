# Some notes on web components

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

