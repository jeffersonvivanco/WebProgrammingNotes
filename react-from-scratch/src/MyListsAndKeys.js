import React, {Component} from "react";

/*
Keys
* Keys help React identify which items have changed, are added, or are removed. Keys should
  be given to the elements inside the array to give the elements a stable identity.
* the best way to pick a key is to use a string that uniquely identifies a list item among its siblings.
  Most often you would use IDs from your data as keys.
* When you don't have stable IDs for rendered items, you may use the item index as a key as a last resort.
  It's not recommended using indexes for keys if the order of items may change. This can negatively impact
  performance and may cause issues with component state. If you choose not to assign an explicit key to
  list items, then React will default to using indexes as keys.
* a good rule of thumb is that elements inside the map() call need keys
* keys must only be unique among siblings
* keys serve as a hint to React but they don't get passed to your components.

Embedding map() in JSX
...
return (
  <ul>
  {numbers.map((number) => <ListItem key={number.toString()} value={number} />)}
  </ul>
 */

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map(n => <li key={n.toString()}>{n}</li>);
  return <ul>{listItems}</ul>;
}
export class MyListsAndKeys extends Component {
  render() {
    return <NumberList numbers={[1, 2, 3]} />;
  }
}
