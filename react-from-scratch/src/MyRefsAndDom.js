import React, {Component} from 'react';

/*
Refs and the DOM

* Refs provide a way to access DOM nodes or React elements created in the render().
* In the typical React dataflow, `props` are the only way that parent components interact with their children. To modify
  a child, you re-render it with new props. However, there are a few cases where you need to imperatively modify a child
  outside of the typical dataflow.

When to use Refs
* Managing focus, text selection, or media playback
* Triggering imperative animations
* Integrating with 3rd party DOM libraries

Avoid using refs for anything that can be done declaratively. For example, instead of exposing open() and close() methods
on a Dialog component, pass an isOpen prop to it.

Don't overuse refs
* Your first inclination may be to use refs to "make things happen" in your app. If this is the case, take a moment and
  think more critically about where the state should be owned in the component hierarchy.

Accessing refs
* when a ref is passed to an element in render, a reference to the node becomes accessible at the current attribute of
  the ref ex: const node = this.myRef.current
* the value of the ref differs depending on the type of the node
  * when the ref attribute is used on an HTML element, the ref created in the constructor with React.createRef() receives
    the underlying DOM element as its current property.
  * when the ref attribute is used on a custom class component, the ref object receives the mounted instance of the component
    as its current
  * you may not use the ref attribute on function components because they don't have instances
* React will assign the "current" property with the DOM element when the component mounts, and assign it back to null when
  when it unmounts. ref updates happen before componentDidMount or componentDidUpdate lifecycle methods
 */
class MyRefsAndDom extends Component{
  constructor(props) {
    super(props);
    /*
    Refs are commonly assigned to an instance property when a component is constructed
    so they can referenced throughout the component
     */
    this.divRef = React.createRef();
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(evt) {
    evt.preventDefault();
    console.log('ref of clicked element',this.divRef);
  }
  render() {
    return (
      // attaching ref to button, ref created in the constructor
      <button ref={this.divRef} onClick={this.handleClick}>Click to view ref</button>
    )
  }
}
export default MyRefsAndDom;
