import React, {Component} from "react";
/*
Conditional Rendering

In React, you can create distinct components that encapsulate behavior you need. Then, you can render some of them,
depending on the state of your application.

Element Variables
* You can use variables to store elements. This can help you render a part of the component while the rest of the
  output doesn't change. ex: const button = isLoggedIn ? <LogoutButton ... /> : <LoginButton ... />

Inline if with logical && operator

ex:
<div>
  {unreadMessages.length > 0 && <h2>You have {unreadMessages.length} unread messages.</h2>}
</div>

It works because in JS, true && expression always evaluates to expression, and false && expression always
evaluates to false. Therefore, if the condition is true, the element right after && will appear in the output.
If it is false, React will ignore and skip it. Note that returning a falsy expression will still cause the element
after && to be skipped but will return the falsy expression. Below, <div>0</div> will be returned by the render method.

render() {
  const count = 0;
  return (
    <div> {count && <h1>Messages: {count}</h1>} </div>
}

Inline if-else with conditional operator

Another method for conditionally rendering elements inline is to use the JS conditional operator condition ? true : false
ex: <div>The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in</div>

Remember that whenever conditions become too complex, it might be a good time to extract a component.

Preventing Component from rendering
* In rare cases you might want a component to hide itself even though it was rendered by another component. To do this,
  return null instead of its render output.
* Returning null from a component's render method does not affect the firing of the component lifecycle methods. For
  instance componentDidUpdate will still be called.
*/

function UserGreeting(props) {
  return <h1>Welcome Back</h1>;
}
function GuestGreeting(props) {
  return <h1>Please sign up</h1>;
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  // Conditional rendering in React works the same way conditions work in JS.
  // Use JS operators like if or the conditional operator (... ? ... : ...) to
  // create elements representing the current state, and let React update the UI
  // to match them.
  if (isLoggedIn) {
    return <UserGreeting/>;
  }
  return <GuestGreeting />
}
export class MyConditionalRendering extends Component {
  render() {
    return <Greeting isLoggedIn={true} />;
  }
}

