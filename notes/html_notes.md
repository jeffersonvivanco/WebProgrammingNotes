# Some notes on HTML
Please note: these notes are not mine, they are based on what I
read in the MDN docs and other blogs and articles.

* HTML elements
  * `Element`
    * `getBoundingClientRect` - returns the size of an element and its position relative to the viewport
  * `<img>`
    * The HTML 5 `srcset` and `sizes` attributes define multiple images at different sizes and resolutions. The browser then
    selects the most appropriate version for the device.
  * `<address>`
    * The HTML `<address>` element indicates that the enclosed HTML provides contact information for a person or people,
      or for an organization.
    * The contact information provided by an `<address>` element's contents can take whatever form is appropriate for the
      context, and may include any type of contact information that is needed such as a physical address, URL, email address,
      phone number, social media handle, geographic coordinates, and so forth. The `<address>` element should include the
      name of the person, people, or organization to which the contact information refers. `<address>` can be used in a
      variety of contexts, such as providing a business's contact information in the page header, or indicating the author
      of an article by including an `<address>` within `<article>`.  
* HTML Events
  * `load`
    * fires after all sources (css) have been loaded which could not be the case with `DOMContentLoaded`

## Element
`Element` is the most general base class from which all element objects in a `Document` inherit. It only has methods
and properties common to all kinds of elements. More specific classes inherit from `Element`. For example, the
`HTMLElement` is the base interface for HTML elements, while the `SVGElement` interface is the basis for all SVG elements.

### Properties
* `Element.attributes` - returns a `NamedNodeMap` object containing the assigned attributes of the corresponding HTML
  element.

### Methods
* `Element.scrollIntoView()` - scrolls the element's parent container such that the element on which `scrollIntoView()`
  is called is visible to the user.
  * parameters
    * `alignToTop` (optional) - boolean
      * If `true` (default), the top of the element will be aligned to the top of the visible area of the scrollable ancestor.
        Corresponds to `scrollIntoViewOptions: {block: "start", inline: "nearest"}`
      * If `false`, the bottom of the element will be aligned to the bottom of the visible area of the scrollable ancestor.
        Corresponds to `scrollIntoViewOptions: {block: "end", inline: "nearest"}`
    * `scrollIntoViewOptions` (optional) - is an object with the following properties
      * behavior (optional) - defines the transition animation. One of (default) `auto` or `smooth`.
      * block (optional) - defines vertical alignment. One of (default) `start`, `center`, `end`, or `nearest`.
      * inline (optional) - defines horizontal alignment. One of `start`, `center`, `end` or (default) `nearest`.
    

## NameNodeMap
The `NamedNodeMap` interface represents a collection of `Attr` objects. Objects inside a `NamedNodeMap` are not in any
particular order, unlike `NodeList`, although they may be accessed by an index as in an array. A `NamedNodeMap` object
is *live* and will thus be auto-updated if changes are made to its contents internally or elsewhere.

### Methods
* `NamedNodeMap.getNamedItem(name)` - returns an `Attr`, corresponding to the given name.

## Full Background Image
Look at backgroundImage.html

## Vertical Centering
Look at verticalCentering.html
