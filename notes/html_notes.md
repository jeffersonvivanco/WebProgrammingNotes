# Some notes on HTML
Please note: these notes are not mine, they are based on what I
read in the MDN docs and other blogs and articles.

## Element
`Element` is the most general base class from which all element objects in a `Document` inherit. It only has methods
and properties common to all kinds of elements. More specific classes inherit from `Element`. For example, the
`HTMLElement` is the base interface for HTML elements, while the `SVGElement` interface is the basis for all SVG elements.

### Properties
* `Element.attributes` - returns a `NamedNodeMap` object containing the assigned attributes of the corresponding HTML
  element.
  
## NamedNodeMap
The `NamedNodeMap` interface represents a collection of `Attr` objects. Objects inside a `NamedNodeMap` are not in any
particular order, unlike `NodeList`, although they may be accessed by an index as in an array. A `NamedNodeMap` object
is *live* and will thus be auto-updated if changes are made to its contents internally or elsewhere.

### Methods
* `NamedNodeMap.getNamedItem(name)` - returns an `Attr`, corresponding to the given name.  
