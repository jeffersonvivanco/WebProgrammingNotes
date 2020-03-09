import React, {Component} from 'react';

/*
Handling Events
handling events with React elements is very similar to handling events on DOM elements. There are some syntactic differences:
* React events are named using camelCase, rather an lower case
* with JSX you pass a function as the event handler, rather than a string

* Another difference is that you cannot return false to prevent default behavior in React. You must call preventDefault
  explicitly.
* When using React, you generally don't need to call addEventListener to add listeners to a DOM element after it is created.
  Instead you just provide a listener when the element is initially rendered.
* When you define a component using an ES6 class, a common pattern is for an event handler to be a method on a class.
  You have to be careful about the meaning of "this" in JSX callbacks. In Javascript, class methods are not bound by
  default. If you forget to bind this.handleClick and pass it to onClick, "this" will be undefined when the function is
  actually called. This is not React-specific behavior; it is part of how functions work in JS.
* Generally, if you refer to a method without "()" after it, such as onClick={this.handleClick}, you should bind that
  method.
* If calling bind annoys you, there are 2 ways you can get around this
  1 If you are using experimental public class fields syntax, you can use class fields to correctly bind callbacks:
    // this syntax ensures "this" is bound within handleClick
    // Warning: this is experimental syntax
    handleClick = () => {
      console.log('this is:', this);
    }

   2 If you aren't using class fields context, you can use an arrow function in the callback
   // this syntax ensures 'this' is bound with handleClick
   <button onClick={(e) => this.handleClick(e)}>Click Me</button>
   The problem with this syntax is that a different callback is created each time the component renders. In most cases,
   this is fine. However, if this callback is passed as a prop to lower components, those components might do an extra
   re-rendering. We generally recommend binding in the constructor or using the class fields syntax, to avoid this sort
   of performance problem.

Passing arguments to event handlers
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
In both cases, the e argument representing the react event will be passed as a 2nd argument after the ID. With an arrow
function, we have to pass it explicitly, but with bind any further arguments are automatically forwarded.
 */
class MyHandlingEvents extends Component {
  constructor() {
    super();
    this.state = {
      count: 0
    }
    // this binding is necessary to make "this" work in the callback
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    e.preventDefault();
    console.log('the link was clicked');
    this.setState((state, props) => ({count: state.count + 1}))
  }
  render() {
    return (
      <section>
        <h2>My Handling Events</h2>
        <p>Number of times clicked {this.state.count}</p>
        <a href="#" onClick={this.handleClick}>Click Me</a>
      </section>
    );
  }
}

export default MyHandlingEvents;
