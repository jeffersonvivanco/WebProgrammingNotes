/*
Context - provides a way to pass data through the component tree without having to pass props down manually at every
level.

* When to use Context
  * Context is designed to share data that can be considered "global" for a tree of React components, such as the current
    authenticated user, theme, or preferred language.
* Before you use Context
  * Context is primarily used when some data needs to be accessible by many components at different nesting levels. Apply
    it sparingly because it makes component reuse more difficult.
  * If you only want to avoid passing some props through many levels, component composition is often a simpler solution
    than context.
 */

import React, {createContext, useContext, useEffect, useState} from 'react';

// creates a Context object
const Context = createContext();

function Test() {
  const name = useContext(Context);
  return (
    <>
    <h1>Name: {name}</h1>
    </>
  );
}

function MyContext() {
  const [value, setValue] = useState('');
  useEffect(() => {
    setTimeout(() => {
      setValue('Zalma');

    }, 1000);
  });
  return (
    <Context.Provider value={value}>
      <Test/>
    </Context.Provider>
  );
}

export default MyContext;
