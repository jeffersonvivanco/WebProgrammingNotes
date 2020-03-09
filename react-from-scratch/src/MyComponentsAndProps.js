import React, {Component} from 'react';

/*
The simplest way to define a component is to write a JS function
* This function is a valid React component because it accepts a single "props"
  object argument with data and returns a React element. We call such components
  "function components" because they are literally JS functions.
 */
function Welcome(props) {
  return <h1>welcome {props.name}</h1>
}

/*
You can also use an ES6 class to define a component

Components let you split the UI into independent, reusable pieces, and think about each piece in isolation.

Rendering a component
* Previously, we only encountered React elements that represent DOM tags, const el = <div></div>
  However, elements can also represent user defined components const el = <Welcome name="Jeff" />
  When React sees an element representing a user-defined component, it passes JSX attributes to this component as a
  single object called "props".
* note: Always start component names with a capital letter.

Extracting Components
* extracting components might seem like grunt work at first, but having a palette of reusable components pays off in
  larger apps. A good rule of thumb is that if part of your UI is used several times (Button, Panel, Avatar), or is
  complex enough on its own (App, FeedStory, Comment), it is a good candidate to be a reusable component.

Props are read-only
* whether you declare a component as a function or a class, it must never modify its own props.
* all react components must act like pure functions with respect to their props
 */
class MyComponentsAndProps extends Component {
  render() {
    return (
      <section>
        <h1>My Components and Props</h1>
        <article>
          <Welcome name={this.props.name}/>
        </article>
      </section>
    )
  }
}

export default MyComponentsAndProps;
