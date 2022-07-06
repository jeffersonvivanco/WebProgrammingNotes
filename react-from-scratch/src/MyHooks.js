/*
Hooks - New to 16.8
* They let u use state and other react features without writing a class
* Motivation
  * With hooks, you can extract stateful logic from a component so it can be
    tested independently and reused. Hooks allow you to use stateful logic
    without changing your component hierarchy. This makes it easy to share
    Hooks among many components or with the community.
  * Hooks let you split 1 component into smaller functions based on what pieces
    are related (such as setting up a subscription or fetching data), rather than
    forcing a split based on lifecycle methods. You may also opt into managing the
    component's local state with a reducer to make it more predictable.
  * Hooks let u use more of React's features without classes. Conceptually, React
    components have always been closer to functions. Hooks embrace functions, but
    without sacrificing the practical spirit of React. Hooks provide access to imperative
    escape hatches and don't require you to learn complex functional or reactive programming
    techniques.

* What is a Hook?
  * Hooks are functions that let you "hook into" React state and lifecycle features
    from function components. Hooks don't work inside classes--they let you use React
    without classes.
  * Built-in hooks

    * useState
      * We call it inside a function component to add some local state to it.
      * useState return a pair: the current state value and a function that lets you update it.
      * arg is the initial state
      * you can use the State hook more than once in a single component

    * useEffect
      * You've likely performed data fetching, subscriptions, or manually changing the DOM from
        React components before. We call these operations side effects or effects for short because
        they can affect other components and can't be done during rendering.
      * adds the ability to perform side effects from a function component. It serves the same purpose as
        componentDidMount, componentDidUpdate, and componentWillUnmount in React classes, but unified
        into a single API.
      * When u call useEffect, you're telling React to run your "effect" function after flushing changes
        to the DOM. Effects are declared inside the component so they have access to its props and state.
        By default, React runs the effects after every render--including the first render.
      * Effects may also optionally specify how to clean "clean up" after them by returning a function. For
        example, this component uses an effect to subscribe to a friend's online status, and cleans up by
        unsubscribing from it:
        useEffect(() => {
          ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
          return () => {
            ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
          };
        });
        In this example, React would unsubscribe from our ChatAPI when the component unmounts, as well as before
        re-running the effect due to a subsequent render.
      * Just like with useState, you can use more than a single effect in a component
      * Hooks let you organize side effects in a component by what pieces are related (such as adding and removing
        a subscription), rather than forcing a split based on lifecycle methods.

      * Optimizing Performance by Skipping Effects
        * You can tell React to skip applying an effect if certain values haven't changed between re-renders.
          To do so, pass an array as an optional second argument to useEffect:

          useEffect(() => {
            document.title = `You clicked ${count} times`;
          }, [count]); // only re-run the effect if count changes
  * You can also create your own Hooks to reuse stateful behavior between different
    components.

  * Other Hooks
    * useContext - lets you subscribe to React context without introducing nesting:
      function Example() {
        const locale = useContext(LocaleContext);
        const theme = useContext(ThemeContext);
      }
    * useReducer - lets you manage local state of complex components with a reducer:
      function Todos() {
        const [todos, dispatch] = useReducer(todosReducer);
        // ...
      }

* Rules of Hooks
  * Only call Hooks at the top level. Don't call Hooks inside loops, conditions, or nested functions.
  * Only call Hooks from React function components. There is just one other valid place to call Hooks--your
    own custom Hooks.

* Building your own Hooks
  * custom Hook example:
    function useFriendStatus(friendId) {
      const [isOnline, setIsOnline] = useState(null);
      function handleStatusChange(status) {
        setIsOnline(status.isOnline);
      }
      useEffect(() => {
        ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange)l
        return () => {
          ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
        };
      });

      return isOnline;
    }

    It takes friendID as an argument, and returns whether our friend is online

    function FriendListItem(props) {
      const isOnline = useFriendStatus(props.friend.id);
      return (
        <li style={{ color: isOnline ? 'green' : 'black' }}>
          {props.friend.name}
        </li>
      );
    }

  * Custom Hooks are more of a convention than a feature. If a function's name starts with "use"
    and it calls other Hooks, we say it is a custom Hook.
  * You can write custom Hooks that cover a wide range of use cases like form handling, animation,
    declarative subscriptions, timers, and probably many more we haven't considered.



 */

import React, {useEffect, useReducer, useState} from "react";

const initialState = {count: 0}

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function MyReducerCounter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
    Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  )
}


function MyHooks() {

  const [count, setCount] = useState(0); // useState Hook

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  })
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <MyReducerCounter />
    </div>
  )
}

// todo: Look up why cant export function as function without default
export default MyHooks;
