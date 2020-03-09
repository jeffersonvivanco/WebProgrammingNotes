import React, {Component} from 'react';
import {hot} from "react-hot-loader";

import './App.css';
import MyJSX from "./MyJSX";
import MyComponentsAndProps from "./MyComponentsAndProps";
import MyStateAndLifecycle from "./MyStateAndLifecycle";
import MyHandlingEvents from "./MyHandlingEvents";
import MyForms from "./MyForms";

class App extends Component {
  render() {
    return (
      <section>
        <h1 className="title">React from Scratch!</h1>
        <MyJSX/>
        <MyComponentsAndProps name={'Jeff'}/>
        <MyStateAndLifecycle/>
        <MyHandlingEvents/>
        <MyForms greeting={'good night'}/>
      </section>
    )
  }
}

export default hot(module)(App);
