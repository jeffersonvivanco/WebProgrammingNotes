# CSS Notes
Some notes on CSS. These notes are from various sources such as
MDN, Chrome developer, etc., these notes are not mine.

## 2D Transformations
Look at transformations.html
* translate
* rotate
* scale
* skew

## 3D Transformations
Look at transformations3d.html
* perspective
  * this css property determines the distance between the z=0 plane and the user in order to give a
  a 3D-positioned element some perspective. Each 3D element with z>0 becomes larger; each 3D element
  with z<0 becomes smaller. The strength of the effect is determine by the value of this property.
  * please note that the perspective property doesn't affect how the element is rendered; it simply enables
  a 3D-space for children elements. this is the main difference between the transform: perspective() function
  and the perspective property. The first gives element depth while the later creates a 3D-space shared by all
  its transformed children.
  * if you use the perspective function on multiple elements the effect breaks. The transformed elements don't
  line up together. This is because each element has its own perspective, its own vanishing point. To remedy this
  use the perspective property on the parent element.
* 3D transform functions
  * rotateX()
  * rotateY()
  * rotateZ()
  * translateZ() - positions the element along the z-axis, which runs front to back in 3D space. Positive values position
  the element closer to the viewer, negative values further away.
  * scaleZ()
* shorthand transform functions - these 3 arg transform3d() functions also have the benefit of triggering hardware
acceleration.
  * translate3d(tx, ty, tz)
  * scale3d(sx, sy, sz)
  * rotate3d(rx, ry, rz)
* Pattern for any 3D transform: keeping the 3d space element and the object seperate element establishes a paradigm that is
simple to understand and easier to style.
  * scene
  * object
  * faces
* `preserve-3d`
  * an element's perspective only applies to direct descendant children. In order for subsequent children to inherit a
 parent's perspective, and live in the same 3d-space, the parent can pass along its perspective with `transform-style: preserve-3d`.
* `backface-visibility`
  * in transformation3d.html, in the card flip example, this is used to hide the back-side of the faces when they are
    faced away from the viewer.
* `transform-origin`
  * by default, the tranform origin of an element is at its horizontal and vertical center (50% 50% or center center)
  * an element's transforms are applied from its transform-origin

## Transitions
Look at transitions.html
* shorthand: `transition: <property> <duration> <timing-function> <delay>`
* JavaScript
  * **Care should be taken when using a transition immediately after**:
    * adding the element to the DOM using .appendChild()
    * removing an element's `display: none;` property
  * this is treated as if the initial state had never occurred and the element was always in its final state. the easy way
  to overcome this limitation is to apply  `window.setTimeout()` of a handful of ms before changing the CSS property you
  intent to transition to.

## CSS Gradients
Look at cssGradients.html
CSS gradients are represented by the `<gradient>` data type, a special type of `<image>` made of a progressive transition
between two or more colors. You can choose between 3 gradient types:
1. *linear* - created with the `linear-gradient()` function
2. *radial* - created with the `radial-gradient()` function
3. *conic* - created with the conical-gradient function

You can also create repeating gradients with the `repeating-linear-gradient()` and `repeating-radial-gradient()` functions.
    

## CSS Filters
* Right now filters apply to the whole element and all its descendants.
* Though CSS filters encompass a huge range of possibilites, the most common usage will be the canned effects,
namely grayscale, sepia, saturate, hue-rotate, invert, opacity, brightness, contrast, blue, and drop-shadow.
* syntax
  * `grayscale(0)`
  * `sepia(0)`
  * `saturate(1)`
  * `hue-rotate(0deg)`
  * `invert(0)`
  * `opacity(1)`
  * `brightness(1)`
  * `contrast(1)`
  * `blur(0px)`
  * `drop-shadow()` - same values as box-shadow
* `drop-shadow`
  * Its awesome
  * Why? lets say you have a png, if you use drop-shadow on the img element, its going to give a shadow to the img box however, if you use the css filter, it will give a shadow to the png itself, which looks awesome.

## @keyframes
* `animation-timing-function`
  * Note: **this is the only property that can be included within keyframe declarations.**
* `animation-direction`
  * sometimes you want animations to behave like transitions: when you transition on hover, the animation reverses on mouse out. Setting this property to `alternate`, every other animation can be set to go from 100% to 0%.
* `animation-delay`
  * *If you want animation to begin halfway through the animation, include an `animation-delay` value that is negative. For example, if you have a 10s animation, including an `animation-delay: 5s;` will cause the animation to start immediately, starting half way through the animation.*
* animation shorthand
  * `animation: <name> <duration> <timing-function> <delay> <iteration-count> <direction> <fill-mode>;`
* `animation-fill-mode`
  * takes one of four values: **backwards, forwards, none or both, with default being none**
  * **backwards**: makes the element go directly to keyframe 0% when they page loads, even if there is an `animation-delay`, staying there until the animation starts
  * **forwards**: tells the browser to stop the animation on the last keyframe at the end of the last iteration and not revert back to its pre-animation state.
  * **both**: applies both backwards and forwards

## Request Animation Frame
Look at requestAnimationFrame.html
* Frame rate anf setInterval
  * the smoothness of your animation depends on the frame rate of your animation
  * frame rate is measured in frames per second (fps). film usually runs at 24fps, video at 30fps. The higher this number is, the smoother your animation will look...to a point. More frames, means more processing, which can often cause stuttering and skipping. This is what is meant by the term dropping frames. Because most screens have a refresh rate of 60Hz, the fastest frame rate you should aim for is 60 fps.
  * *1000ms / 60 (fps) = 16.7ms ~ 17*
* Whats wrong with setTimeout and setInterval
  * First `setTimeout` doesn't take into account what is happening in the browser. The page could have hidden behind a tab, hogging your CPU when it doesn't need to, or the animation itself could have been scrolled off the page making the update call again unnecessary. Chrome does throttle `setInterval` and `setTimeout` to 1fps in hidden tabs, but this isn't to be relied upon for all browsers.
  * Secondly `setTimeout` only updates the screen when it wants to, not when the computer is able to. That means your poor browser has to juggle redrawing the animation whilst redrawing the whole screen, and if your animation frame rate is not synchronized with the redrawing of your screen, it could take up more processing power. That means higher CPU usage and your computer's fan kicking in, or draining the battery on your mobile device. 
  * Another consideration is the animation of multiple elements at once. One way to approach this is to place all the animation logic in one interval with the understanding that animation calls may be running even though a particular element may not require any animation for the current frame. The alternative is to use seperate intervals. The problem with this approach is that each time you move something on the screen, your browser has to repaint the screen. This is wasteful.
* `requestAnimationFrame`
  * To overcome these efficiency problems, Mozilla proposed the `requestAnimationFrame` function, which was later adopted and improved by the WebKit team. *It provides a native API for running any type of animation in the browser, be it using DOM elements, CSS, canvas, WebGL, or anything else.
  * The key difference here is that you are requesting the browser to draw your animation at the next available opportunity, not at a predetermined interval. It has also been hinted that browsers could choose to optimized performance of `requestAnimationFrame` based on load, element visibility (being scrolled out of view) and battery status.
  * The other beauty of `requestAnimationFrame` is that it will group all of your animations into a single browser repaint.
  * What if I want to set a frame rate ?
    * One technique would be to check the number of ms past since that last draw call and update the animation's position based on the time difference.
* Game Dev
  * `requestAnimationFrame` vs user input
    * Events can cause work whenever ex: Timers, DOM input handlers, non contiguous work, so -> **buffer your inputs and handle in RAF(`requestAnimationFrame`)

## Fullscreen API
Look at fullscreenAPI.html
The Fullscreen API adds methods to present a specific Element (and its descendants) in fullscreen mode, and to exit full-screen mode once it is no longer needed.

## CSS media queries
Media queries are useful when you want to modify your site or app depending on a device's general type
(such as print vs screen) or specific characteristics and parameters (such as screen resolution or browser
viewport width).
Media queries are used for the following:
* To conditionally apply styles with the CSS `@media` and `@import` at-rules
* To target specific media for the `<link>`, `<source>`, and other html elements.
* To test or monitor media states using the `Window.matchMedia()` and `MediaQueryList.addListener()`
javascript methods.

* Media Types - describe the general category of a device. Except when using the `not` or `only` logical
operators, the media type is optional and the `all` type will be implied.
  * `all` - suitable for all devices
  * `print` - intended for paged material and documents viewed on a screen in print preview mode.
  * `screen` - intended primarily for screens
  * `speech` - intended for speech synthesizers

* Media Features - describe specific characteristics of the user agent, output device, or environment. Media
feature expressions test for their presence or value, and are entirely optional. Each media feature expression
must be surrounded by parenthesis. Here are some:
  * `width`
  * `height`
  * `aspect-ratio`
  * `orientation`
  * `hover`
  * `scripting` - detectes whether JS is available

* Logical Operators - The logical operators `not`, `and`, and `only` can be used to compose a complex media
query. You can also combine multiple media queries into a single rule by seperating them with commas.

Syntax improvements in level 4
* `@media (max-width: 30em) {...}` -> `@media (width <= 30em) {...}`
* `@media (min-width: 30em) and (max-width: 50em) {...}` -> `@media (30em <= width <= 50em ) { ... }`
* Negating a feature with `not` ex: `@media (not(hover)) {...}`, this says if device has no hover capability
* Testing for multiple features with `or`

Media Queries for Standard Devices
* You should not base your breakpoints on devices!!
* Choosing breakpoints based on your design and not specific devices is a smart way to go.

## CSS Flex
Note: Flexbox layout is most appropriate to the components of an application, and small-scale layouts,
while the Grid layout is intended for larger scale layouts.

* Properties of the parent (flex container)
  * `display`: flex | inline-flex
  * `flex-direction`: row | row-reverse | column | column-reverse
  * `flex-wrap`: nowrap | wrap | wrap-reverse
  * `flex-flow`: <'flex-direction'> || <'flex-wrap'>
  * `justify-content`: flex-start (default) | flex-end | center | space-between | space-around
    space-evenly | start | end | left | right ... + safe | unsafe
      * This defines the alignment along the main axis. It helps distribute extra free space leftover
        when either all the flex items on a line are inflexible, or are flexible but have reached their
        maximum size. It also exerts some control over the alignment of items when they overflow the
        line.
      * Note that the browser support for these values is nuanced. For example, `space-between` never
        got support from some versions of Edge, and start/end left/right aren't in Chrome yet. The
        safest values are `flex-start`, `flex-end`, and `center`.
      * There are also two additional keywords you can pair with these values: `safe` and `unsafe`.
        Using `safe` ensures that however you do this type of positioning, you can't push an element
        such that it renders off-screen (e.g. off the top) in such a way the content can't be scrolled
        too (called "data loss").
  * `align-items`: stretch (default) | flex-start | flex-end | center | baseline | first baseline
    last baseline | start | end | self-start | self-end + ... safe | unsafe
    * This defines the default behavior for how flex items are laid out along the cross axis on the
      current line. Think of it as the `justify-content` version for the cross axis (perpendicular
      to the main axis).
  * `align-content`: flex-start | flex-end | center | space-between | space-around | space-evenly
    stretch (default) | start | end | baseline | first baseline | last baseline + ... safe | unsafe
    * This aligns a flex container's lines within when there is extra space in the cross-axis,
      similar to how `justify-content` aligns individual items within the main-axis.
    * Note: this property has no effect when there is only one line of flex items.

* Properties for the children (flex items)
  * `order`: integer;
    * By default, flex items are laid out in the source order. However, the order property
      controls the order in which they appear in the flex container.
  * `flex-grow`: number
    * This defines the ability for a flex item to grow if necessary. It accepts a unitless value
      that serves as a proportion. It dictates what amount of the available space inside the flex
      container the item should take up.
    * If all items have `flex-grow` set to 1, the remaining space in the container will be distributed
      equally to all children. If one of the children has a value of 2, the remaining space would take
      up twice as much space as the others (or will try to at least).
    * Negative numbers are invalid.
  * `flex-shrink`: number
    * this defines the ability for a flex item to shrink if necessary. Negative numbers are invalid.
  * `flex-basis`: length | auto
    * This defines the default size of an element before the remaining space is distributed. It
      can be a length (e.g. 20%, 5rem, etc.) or a keyword. The `auto` keyword means "look at my
      width or height property". The `content` keyword means "size it based on the item's content",
      this keyword isn't well supported yet, so it's hard to test and harder to know what its
      brethen `max-content`, `min-content`, and `fit-content` do.
    * If set to 0, the extra space around content isn't factored in. If set to `auto`, the extra
      space is distributed based on its `flex-grow` value.
  * `flex`: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'>]
    * This is shorthand for `flex-grow`, `flex-shrink`, and `flex-basis` combined. The 2nd and 3rd
      parameters are optional. The default is `0 1 auto`, but if you set it with a single number
      value, it's like `<number> 1 0`.
    * **It is recommended that you use this shorthand property** rather than set the individual
      properties. The shorthand sets the other values intelligently.
  * `align-self`: auto | flex-start | flex-end | center | baseline | stretch
    * This allows the default alignment (or the one specified by `align items`) to be overriden
      for individual flex items.
    * Note that `float`, `clear`, `vertical align` have no effect on a flex item. 

## CSS Grid
Look at cssGrid.html
* Properties for the parent (Grid Container)
  * `grid-auto-columns, grid-auto-rows`
    * specifies the size of any auto-generated grid tracks (aka implicit grid tracks). Implicit tracks get
    created when there are more grid items than cells in the grid or when a grid item is placed outside of
    the explicit grid.
  * `grid-auto-flow`
    * if you have grid items that you don't explicitly place on the grid, the *auto-placement-algorithm* kicks
    in to automatically place the items. This property controls how the auto-placement algorithm works.
    * values
      * row - tells the auto-placement algorithm to fill in each row in turn, adding new rows as necessary (default)
      * column - tells the auto-placement algorithm to fill in each column in turn, adding new columns as necessary
      * dense - tells the auto-placement algorithm to attempt to fill in holes earlier in the grid if smaller items
      come up later Note: dense only changes the visual order of your items and might cause them to appear out of order, which is bad for accessibility.
* Properties for the Children (Grid Items)
  * `grid-column-start, grid-column-end, grid-row-start, grid-row-end`
    * determines a grid item's location within the grid by referring to specific grid lines.
    * `grid-column-start/grid-row-start` - is the line where the item begins
    * `grid-column-end/grid-row-end` - is the line where the item ends
    * values
      * `<line>` - can be a number to refer to a numbered grid line, or a name to refer to a named grid line
      * `span <number>` - the item will span across the provided number of grid tracks
      * `span <name>` - the item will span across until it hits the next line with the provided name
      * `auto` - indicates auto-placement, an automatic span, or a default span of one
    * if no `grid-column-end/grid-row-end` is declared, the item will span 1 track by default
    * items can overlap each other. You can use z-index to control their stacking order.
  * `grid-column, grid-row` - shorthand for `grid-column-start` + `grid-column-end`, and `grid-row-start`
  * `grid-row-end`
    * values
      * `<start-line>/<end-line>` - each one accepts all the same values as the longhand version, including span
  * `grid-area` - gives an item a name so that it can be referenced by a template created with the `grid-template-areas` property. Alternatively, this property can be used as an even shorter shorthand for `grid-row-start` + `grid-column-start` + `grid-row-end` + `grid-column-end`
    * values
      * `<name>` - a name of your choosing
      * `<row-start>/<column-start>/<row-end>/<column-end>` can be numbers or named lines
  * `justify-self` - aligns a grid item inside a cell along the *inline(row)* axis. This value applies to a grid
  item inside a single cell. values: start, end, center, stretch
  * `align-self` - aligns a grid item inside a cell along the *block(column)* axis. This value applies to the content inside a single grid item. values: start, end, center, stretch

## CSS Pseudo-classes
* `:active` - represents an element (such as a button) that is being activated by the user. When using a mouse, activation typically starts when the user presses down the primary mouse button.
* `:checked` - represents any radio (`<input type="radio">`), checkbox(`<input type="checkbox"`), or option(`<option>` in a `<select>`) element that is checked or toggled to an on state.
* `:default` - represents any form element that is the default among a group of related elements.
  * this selector may be used on the `<button>, <input type="checkbox">, <input type="radio"> and <option> elements`.
* `:dir()` - matches elements based on the directionality of the text contained in them.
  * ex:
  `:dir(rtl) { background-color: red }` 
  * params: ltr, rtl
  * the `:dir()` pseudo-class uses only the semantic value of the directionality, the one defined in the document itself. It doesn't account for styling directionality, the directionality set by CSS properties such as `direction`.
* `:disabled` - represents any disabled element. An element is disabled if it can't be activated (selected, clicked on, typed into, etc) or accept focus. The element also has an enabled state, in which it can be activated or accept focus.
* `:empty` - represents any element that has no children. Children can be either element nodes or text (including whitespace).
* `:enabled` - represents any enabled element. An element is enabled if it can be activated (selected, clicked on, typed into, etc.) or accept focus.
* `:first-child` - represents the first element among a group of sibling elements.
* `:first-of-type` - represents the first element of its type among a group of sibling elements.
* `:fullscreen` - matches every element which is currently in full-screen mode. If multiple elements have been put into fullscreen mode, this selects them all.
* `:focus` - represents an element (such as form input) that has received focus. It is generally triggered when the user clicks or taps on an element or selects it with the keyboard "tab" key.
  * Accessibility Concerns
    * Make sure your visual focus indicator can be seen by people with low vision.
    * `:focus { outline: 'none'}`
      * never just remove the focus outline (visible focus indicator) without replacing it with a focus outline that will pass.
      * removing outlines in CSS creates issues for people navigating the web with a keyboard
      * if you do not like the default focus outline that is displayed when a user clicks on an interactive element, you have 3 accessible solutions
        1. style the outline. consider the user of `a:focus { outline: thin-dotted }` to normalize the look of the outlines across browsers
        2. style the element itself. You can remove the outline as long as you style the focused element differently (using color, background-color, border, or text-decoration: outline; for example)
        3. remove outlines for mouse users only, if you truly *must* do so. *last resort solution*
* `:focus-within` - represents an element that has received focus or contains an element that has received focus. In other words, it represents an element that is itself matched by `:focus` pseudo-class or has a descendant that is matched by `:focus`. This includes descendants in shadow trees.
  * This selector is useful, to take a common example, for highlighting an entire `<form>` container when the user focuses on one of its `<input>` fields.
* `:hover` - matches when the user interacts with an element with a pointing device, but does not necessarily activate it. It is generally triggered when the user hovers over an element with the cursor (the pointer).
  * styles defined by the `:active` pseudo-class will be overridden by any subsequent link-related pseudo-class (:link :visited, or :active) that has at least equal specificity. To style links appropriately, put the `:hover` rule after the `:link` and `:visited` rules but before the `:active` one, as defined by the LVHA-order: `:link -- :visited -- :hover -- :active`.
  * **Note**: The `:hover` pseudo-class is problematic on touchscreens. Depending on the browser, the `:hover` pseudo-class might never match, match only for a moment after touching an element, or continue to match even after the user has stopped touching and until the user touches another element. Web developers should make sure that content is accessible on devices with limited or non-existent hovering capabilities.
* `:indeterminate` - represents any form element whose state is indeterminate.
  * elements targeted by this selector are:
    * `<input type="checkbox">` elements whose indeterminate property is to true by JS
    * `<input type="radio">` elements, when all radio buttons with the same name value in the form are unchecked
    * `<progress>` elements in an indeterminate state
* `:in-range` - represents an `<input>` element whose current value is within the range limits specified by the min and max attributes.
* `:invalid` - represents any `<input>` or other `<form>` element whose contents fail to validate. This pseudo-class is useful for highlighting field errors for the user.
  * accessibility concerns - the color red is commonly used to indicate invalid input. People who have certain types of color blindness will be unable to determine the input's state unless it is accompanied by an additional indicator that does not rely on color to convey meaning. Typically, descriptive text and/or an icon are used.
* `:lang()` - matches elements based on the language they are determined to be in. ex: `p:lang(en) > q {quotes: '<<' '>>'}`
* `:last-child` - represents the last element among a group of sibling elements
* `:last-of-type` - represents the last element of its type among a group of sibling elements
* `:link` - represents an element that has not yet been visited. It matches every unvisited `<a>, <area>, or <link>` element that has an href attribute.
  * styles defined by the `:active` pseudo-class will be overridden by any subsequent link-related pseudo-class (:link :visited, or :active) that has at least equal specificity. To style links appropriately, put the `:hover` rule after the `:link` and `:visited` rules but before the `:active` one, as defined by the LVHA-order: `:link -- :visited -- :hover -- :active`.
* `:not()` - represents elements that do not match a list of selectors. Since it prevents specific items from being selected , it is known as the *negation pseudo-class*.
  * Note: The ability to list more than one selector is experimental and not yet widely supported.
* `:nth-child()` - matches elements based on their position in a group of siblings
  * **syntax**: takes a single arg, which represents the pattern for matching the elements
    * *odd*
    * *even*
    * `An + B` - represents elements whose numeric position in a series of siblings matches this pattern, for every positive integer or zero value of n. The index of the first element is 1. The values of A and B must be both <integers>s.
* `:nth-last-child()` - matches elements based on their position among a group of siblings, counting from the end. Same syntax as `:nth-child()`
* `:nth-last-type()` - matches elements of a given type, based on their position among a group of siblings, counting from the end. Same syntax as `:nth-child()`
* `:nth-of-type()` - matches elements of a given type, based on their position among a group of siblings. Same syntax as `:nth-child()`
* `:only-child` - represents an element without any siblings
* `:only-of-type` - represents an element that has no siblings of the same type
* `:optional` - represents any `<input>,<select>, or <textarea>` element that does not have the `required` attribute set on it.
  * Accessibility Concerns
    * If a form contains optional `<input>`s, required inputs should be indicated using the required attribute. This will ensure that people navigating with the aid of assistive technology such as a screen reader will be able to understand which inputs need valid content to ensure a successful form submission.
* `:out-of-range` - represents an `<input>` element whose current value is outside the range limits specified by the min and max attributes.
* `:placeholder-shown` - represents any `<input> or <textarea>` element that is currently displaying placeholder text.
* `:read-only` - represents an element (such as a locked text input) that is not editable by the user. Need vendor prefix -moz-for firefox
* `:read-write` - represents an element (such as text input) that is editable by the user. This selector doesn't just select `<input>`s; it will select any element that can be edited by the user, such as a `<p>` element with `contenteditable` set on it.
* `:required` - represents any `<input>, <select> or <textarea>` element has the `required` attribute set on it.
  * If a form contains optional inputs, required inputs should be indicated visually using a treatment that does not rely solely on color to convey meaning. Typically, descriptive text and/or an icon are used.
* `:target` - represents a unique element (the target element) with an `id` matching the URL's fragment.
  * ex
  <pre>
  /* Selects an element with an ID matching the current URL's fragment */
  :target {
      border: 2px solid black;
  }
  </pre>
  * For example, the following url has a fragment (denoted by the #sign) that points to an element called `section2`
  http://www.example.com/index.html#section2
  * The following element would be selected by a `:target` selector when the current url is equal to the above.
  <pre><section id="section2">Example</section></pre>
  * You can also use the `:target` pseudo-class to create a lightbox without using any js. This technique relies on the ability to anchor links to point to elements that are initially hidden on the page. Once targeted, the CSS changes their `display` so that they are shown.
* `:valid` - represents any `<input> or other <form>` element whose contents validate successfully. This allows to easily make valid fields adopt an appearance that helps the user confirm that their data is formatted properly.
  * Accessibility Concerns
    * The color green is commonly used to indicate valid input. People who have certain types of color blindness will be unable to determine the input's state unless it is accompanied by an additional indicator that does not rely on color to convey meaning. Typically, descriptive text and/or an icon are used.
* `:visited` - represents links that the user has already visited. For privacy reasons, the styles that can be modified using this selector are very limited.

## CSS Pseudo-elements
* `::after` - creates a pseudo-element that is the last child of the selected element. It is often used to add cosmetic content to an element with the content property. It is inline by default.
  * ex: tooltips
* `::backdrop` - is a box the size of the viewport which is rendered immediately beneath any element being presented in full-screen mode. This includes both elements which have been placed in full screen mode using the FullScreen API and `<dialog>` elements. This pseudo element makes it possible to obscure, style, or completely hide everything located below the element when it's the topmost one in the top layer.
* `::before` - creates a pseudo-element that is the first child of the selected element. It is often used to add cosmetic content to an element with the `content` property. It is inline by default.
  * quotation marks
* `::first-letter` - applies styles to the first letter of the first line of a block-level element, but only when not preceded by other content (such as images or inline tables).
* `::first-line` - applies styles to the first line of a block level element. Note that the length of the first line depends on many factors, including the width of the element, the width of the document, and the font-size of the text.
* `::grammar-error` - represents a text segment which the user agent has flagged as grammatically incorrect.
  * *NOT SUPPORTED BY ANY BROWSER*
* `::placeholder` - represents the placeholder text of a form element
* `::selection` - applies styles to the part of a document that has been highlighted by the user (such as clicking and dragging the mouse across text).
* `::spelling-error` - represents a text segment which the user agent has flagged as incorrectly spelled.
  * *NOT SUPPORTED BY ANY BROWSER*
