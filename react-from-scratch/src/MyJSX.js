import React, {Component} from 'react';

/*
Warning:
* since JSX is closer to JS than to HTML, ReactDom uses camelCase property naming convention
  instead of HTML attribute names. For example, class becomes className and tabindex becomes tabIndex

JSX prevents injection attacks
* It is safe to embed user input in jsx:
const title = response.potentiallyMaliciousInput;
// this is safe
const el = <h1>{title}</h1>
* By default, ReactDom escapes any values embedded in JSX before rendering them. Thus, it ensures that you can never
  inject anything that's not explicitly written in your application. Everything is converted to a string before being
  rendered. This helps prevent XSS attacks.
 */

class MyJSX extends Component {
  render() {
    const name = 'MY JSX';
    const el = (
      <h1>
        Hello this is {name}
      </h1>
    );
    return el;
  }
}

export default MyJSX;
