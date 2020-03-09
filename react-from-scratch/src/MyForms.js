import React, {Component} from 'react';

/*
HTML form elements work a little bit differently from other DOM elements in React, because form elements naturally
keep some internal state.

Controlled Components
* In HTML, form elements such as <input>, <textarea>, and <select> typically maintain their own state and update it based
  on user input. In React, mutable state is typically kept in the state property of components, and only updated with
  setState().
* We can combine the two by making the React state be the "single source of truth". Then the react component that renders
  a form also controls what happens in that form on subsequent user input. An input element whose value is controlled by
  React in this way is called a "controlled component".
* With a controlled component, every state mutation will have an associated handler function. This makes it straightforward
  to modify or validate user input.

The textarea tag
* In HTML, a <textarea> element defines its text by its children
  <textarea>
    Hello there, this is some text in a text area
  </textarea>
* In React, a <textarea> uses a value attribute instead. This way a form using a <textarea> can be written very similarly
  to a form that uses a single-line input.
* Notice that this.state.value is initialized in the constructor, so that the text area starts off with some text in it.

The select tag
* In HTML, <select> creates a drop-down list.
* React, instead of using the selected attribute, it uses a value attribute on the root select tag. This is more convenient
  in a controlled component because you only need to update it in one place.
* Overall, this makes it so that <input type="text">, <textarea>, and <select> all work very similarly - they all accept
  a value attribute that you can use to implement a controlled component.
* Note: You can pass an array into the value attribute, allowing you to select multiple options in a select tag:
  <select multiple={true} value={['B', 'C']}

The file input tag
In HTML, an <input type="file"> lets the user choose one or more files from their device storage to be uploaded to a server
or manipulated by JS via the File API.
* Because its value is read-only, it's an uncontrolled component in React.

Handling multiple inputs
When you need to handle multiple controlled input elements, you can add a name attribute to each element and let the handler
function choose what to do based on the value of event.target.name. For example
handleInputChange(event) {
  const name = event.target.name;
  this.setState({[name]: value}); // using es6 computed property name syntax
}

Controlled Input Null Value
Specifying the value prop on a controlled component prevents the user from changing the input unless you desire so. If
you've specified a value but the input is still editable, you may have accidentally set value to undefined or null.

Alternatives to Controlled Components
It can sometimes be tedious to use controlled components, because you need to write an event handler for every way your
data can change and pipe all of the input state through a React component. This can become particularly annoying when
you are converting a preexisting codebase to React, or integrating a React application with a non-React library. In t
hese situations, you might want to check out uncontrolled components, an alternative technique for implementing input forms.

Fully-Fledged solutions
If you’re looking for a complete solution including validation, keeping track of the visited fields, and handling
form submission, Formik is one of the popular choices.
 */
class MyForms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value.toUpperCase()});
  }
  handleSubmit(event) {
    alert(this.props.greeting + ' ' + this.state.value);
    event.preventDefault();
  }
  render() {
    return (
      <section>
        <h2>My Forms</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.state.value} onChange={this.handleChange}/>
          </label>
          <input type="submit" value="submit"/>
        </form>
      </section>
    );
  }
}

export default MyForms;
