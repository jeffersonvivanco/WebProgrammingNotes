import React, {Component} from 'react';

/*
State and Lifecycle
state is similar to props, but it is private and fully controlled by the component.

Adding Lifecycle methods to a class
* in apps with many components, it's very important to free up resources taken by the components when they are destroyed.
* we want to set up a timer whenever the Clock is rendered to the DOM for the first time. This is called "mounting" in
  React. We also want to clear that timer whenever the DOM produced by the Clock is removed. This is called "unmounting"
  in React.

Using state correctly
* there are 3 things you should know about setState()

  1 Do not modify state directly

    For example, this will not re-render a component: this.state.comment = 'Hello'; // WRONG
    Instead use setState(), this.setState({comment: 'Hello'});
    The only place where you can assign this.state is in the constructor

  2 State updates may be asynchronous

    React may batch multiple setState() calls into a single update for performance.
    Because this.props and this.state may be updated asynchronously, you should not rely
    on their values for calculating the next state
    For example: this.setState({counter: this.state.counter + this.props.increment}); // WRONG
    To fix it, use the second form of setState() that accepts a function rather than an object.
    That function will receive the previous state as the 1st arg, and the props at the time the update is applied as the
    2nd arg. ex: this.setState((state, props) => ({ counter: state.counter + props.increment }));

  3 State updates are merged

    When you call setState(), React merges the object you provide into the current state. The merging is shallow, so
    this.setState({comments}) leaves this.state.posts intact, but completely replaces this.state.comments.

The Data flows Down
* neither parent nor child components can know if a certain component is stateful or stateless, and they shouldn't care
  whether it is defined as a function or class.
* this is why state is often called local or encapsulated. It is not accessible to any component other than the one that
  owns and sets it.
* a component may choose to pass its state down as props to its child components. This is commonly called a "top-down" or
  "unidirectional" data flow. Any state is always owned by some specific component, and any data or UI derived from that
  state can only affect components "below" them in the tree.
* In React apps, whether a component is stateful or stateless is considered an implementation detail of the component that
  may change over time. You can use stateless components inside stateful components, and vice versa.
 */
export class Clock extends Component {
  constructor(props) {
    // note how we pass props to the base constructor
    super(props);
    this.state = {
      date: new Date()
    };
  }
  /*
  We can declare special methods on the component class to run some code when a component mounts and unmounts.
  These methods are called "lifecycle" methods.
  * componentDidMount() - runs after the component output has been rendered to the DOM.

  * Note: while this.props is set up by React itself and this.state has a special meaning, you are free to add additional
    fields to the class manually if you need to store something that doesn't participate in the data flow.
   */
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  tick() {
    this.setState({
      date: new Date()
    });
  }
  render() {
    // note this.state
    return (
      <div>
        <h2>It is {this.state.date.toLocaleTimeString()}</h2>
      </div>
    );
  }
}

class MyStateAndLifecycle extends Component {
  render() {
    return <Clock/>;
  }
}

export default MyStateAndLifecycle;
