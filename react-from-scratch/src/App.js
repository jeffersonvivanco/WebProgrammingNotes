import React, {Component} from 'react';
import {hot} from "react-hot-loader";

import './App.css';
import MyJSX from "./MyJSX";
import MyComponentsAndProps from "./MyComponentsAndProps";
import MyStateAndLifecycle from "./MyStateAndLifecycle";
import MyHandlingEvents from "./MyHandlingEvents";
import MyForms from "./MyForms";
import MyRefsAndDom from "./MyRefsAndDom";
import {MyConditionalRendering} from "./MyConditionalRendering";
import {MyListsAndKeys} from "./MyListsAndKeys";
import MyHooks from "./MyHooks";
import MyHooksDataFetching from "./MyHooksDataFetching";
import MyContext from "./MyContext";

class App extends Component {
  render() {
    const val = {greeting: 'Hello Jeff'};
    return (
      <section>
        <h1 className="title">React from Scratch!</h1>
        <MyJSX/>
        <MyComponentsAndProps name={'Jeff'}/>
        <MyStateAndLifecycle/>
        <MyHandlingEvents/>
        <MyConditionalRendering />
        <MyListsAndKeys />
        <MyForms greeting={'good night'}/>
        <MyRefsAndDom />
        <MyHooks />
        <MyHooksDataFetching />
        <MyContext />
        <my-component greeting={JSON.stringify(val)}/>
      </section>
    )
  }
}


export default hot(module)(App);
