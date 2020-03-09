import React from 'react';
import ReactDom from 'react-dom';
import './index.css';
import App from './App';
import MyComponentsAndProps from "./MyComponentsAndProps";
import {Clock} from "./MyStateAndLifecycle";
import MyForms from "./MyForms";

class MyComponent extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const div = document.createElement('div');
    console.log('attributes passed', this.getAttributeNames());
    this.appendChild(div);
  }
  render() {
    ReactDom.render(<MyForms greeting={this.greeting} />, this.children[0]);
    this.testEvent()
  }
  set greeting(val) {
    this._greeting = val;
    this.render();
  }
  get greeting() {
    return this._greeting;
  }
  testEvent() {
    const customEvent = new CustomEvent('onUserSubmit', {detail: true});
    setTimeout(() => {
      this.dispatchEvent(customEvent);
    }, 4000);
  }
}
class MyClock extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.appendChild(document.createElement('div'));
    this.render();
  }
  render() {
    ReactDom.render(<Clock/>, this.children[0]);
  }

}
customElements.define('my-component', MyComponent);
customElements.define('my-clock', MyClock);
// ReactDom.render(<App />, document.getElementById('root'));
