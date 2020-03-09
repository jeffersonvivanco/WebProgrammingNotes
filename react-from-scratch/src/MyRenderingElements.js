import React, {Component} from 'react';

/*
Updating the rendered element
* react elements are immutable. Once you create an element, you can't change its children or attributes. An element is
  like a single frame in a movie: it represents the UI at a certain point in time.
* with our knowledge so far, the only way to update the UI is to create a new element, and pass it to ReactDOM.render().
  In practice, most React apps only call ReactDOM.render() once.

React only updates what necessary
* ReactDOM compares the element and its children to the previous one, and only applies the DOM updates necessary to bring
  the DOM to the desired state.
* Thinking about how the UI should look at any given moment rather than how to change it over time eliminates a whole class
  of bugs.
 */
class MyRenderingElements extends Component {
  render() {
    return <h1>MyRenderingElements</h1>;
  }
}

export default MyRenderingElements;
