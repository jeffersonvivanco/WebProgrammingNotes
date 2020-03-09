# Design Notes
These notes are based on the Material Design Documentation and other stuff I read in other places. These are not rules,
but merely suggestions to myself when designing UIs.

## Environment

### Surfaces
* One can design objects in the UI with 3D qualities and move them in a way that resembles how they would
move in the real world.
  * Using light, surfaces, and cast shadows makes the environment express 3D space
  * All elements move horizontally, vertically, and at varying depths along the z-axis. Depth is depicted
  by placing elements at various points along the positive z-axis extending towards the viewer.
  * On the web, the UI expresses 3D space by manipulating the y-axis
  * Surfaces should have consistent, unchangeable characteristics and behaviors
    * Dimensions: Dimensions should vary across surfaces
    * Shadows: Surfaces at different elevations should cast different shadows
      * Top view
      * Isometric 3D view showing the shadow cast by light when the material moves upwards
    * Resolution: Infinite resolution
    * Content: 
      * Content does not add thickness to surfaces. Content is expressed without being a separate layer.
      * Content behavior can be independent of surface behavior.
      * Content behavior can depend on surface behavior.
    * Physical Properties
      * Surfaces are solid. User input and interaction cannot pass through surfaces.
      * **Multiple elements cannot occupy the same point in space simultaneously.**
      * Surfaces cannot pass through other surfaces. For example, one surface cannot pass through another surface
      when changing elevation.
      * Elements enter and exits through changes in opacity, size, or position.
  * Transforming Surfaces
    * Surfaces can change shape
    * Surfaces can change opacity
    * Surfaces grow or shrink only along its plane
    * Surfaces bend or fold within the depth of the UI.
    * Surfaces can join together to become a single surface.
    * Surfaces can split and become whole again.
  * Movement 
    * Surfaces can be spontaneously generated or dismissed
    * Surfaces can move along any axis
    * Surfaces can coordinate their motion
    * **Motion along the z-axis is typically a result of user interaction.
  * Attributes: Surfaces can behave in different ways
    * Rigid surfaces remain the size through all interactions
    * Strechable surfaces can grow or shrink along one or more edges up to a size limit, then behave as a rigid surfaces
    * Pannable Surfaces remain the same size throughout interactions. They can display additional content upon scrolling
    within the area, until reaching a content limit. When this limit is reached, they behave as rigid surfaces in that
    scroll direction.

  * Composite Surfaces: Surfaces can be divided into areas which display different types of behavior.
  * Strechable Surfaces: A strechable surface can be streched before reaching a limit, at which point the entire surface
  becomes rigid. Surfaces can stretch vertically, horizontally, or in both directions.
    * Typically, user interaction with a surface will stretch it in one direction. For example, tapping more details can
    cause a card to grow vertically and display additional content.
  * Surface positioning and movement(x/y)
    * Surfaces can remain in a fixed position on the x and y axes, or can be made movable in any direction.
    * ex: Top app bar stays fixed when scrolling through app
    * Surfaces can move independently of each other, or their movement can affect or be dependent upon the movement
    of other surfaces.
    * A dependency can be based on a variety of mechanics, such as nearby surfaces moving when another surface expands,
    or the proportion of movement between surfaces moving in parallax.
  * Surface Opacity
    * Material surfaces can be transparent, semi-transparent, or opaque.
    * **Text on transparent and semi-transparent surfaces may require background treatment to preserve legibility.**
    * **Transparent surfaces lack clear edges, making it difficult to determine where surfaces begin and end, and which**
    **surface content belongs to.** 
  * Scrim
    * **Scrims are temporary treatments that can be applied to surfaces for the purpose of making content on a surface less**
    **prominent. They help direct user attention to other parts of the screen, away from the surface receiving the scrim.**
    * Scrims can applied in a variety of ways, including:
      * Darkening or lightening the surface and its content
      * Reducing the opacity of the surface and its content
    * Multiple surfaces on a screen at a time

## Understanding motion
Motion helps make a UI expressive and easy to use

**Principles**
* Informative
* Focused
* Expressive

**Usage**
* Hierarchy - motion helps orient users by showing how elements are related to one another
* Feedback & status - motion provides timely feedback and the status of user actions
* User education - motion indicates how to perform actions and offers helpful suggestions
* Character - motion adds character and appeal to interactions

**Transition Anatomy** - during a transition, UI elments that transform are caterogized as outgoing, incoming, or persistent. The category an element belongs to influences how it transforms. UI elements that don't transform are categorized as static elements. They don't play a role in the transition.
* *Persistent Element*
    * A persistent element's transformation, such as a navigation icon, starts and ends on screen.
* *Outgoing Element*
    * An outgoing element, such as a title, exits the screen by fading out.
* *Incoming Element*
    * An incoming element, such as each of these action items, enters the screen by fading in.
* *Static Element*
    * A static element, such as the overflow menu, doesn't transform.

**Expressing Continuity** - Motion guides user attention in a smooth, unbroken fashion. When a UI changes appearance, motion provides continuity between the placement and appearance of elements before and after a transition. Continuity is expressed using one or more of the following techniques

* Tweening
    * displays a seamless progression of changes applied to a component or element over time.
    * for example, a switch can move smoothly across a screen by tweening to its position, or a floating action button (FAB) can transform into a card by tweening FAB size and corner radius.
    * tweening can be applied to properties that have a range of intermediate values, such as colors along a spectrum. for example colors can be tweened from red to blue by displaying intermediate colors, like purple.
    * tweening can't be applied to aspects of a UI that don't have intermediate values or states. for example, the number of columns in a layout can be a whole number, such as 1 or 2, but not something in between.
* Fading
    * refers to tweening an element's opacity.
    * Even when elements have properties that don't have intermidiate states, fading can create smooth transitions. for example, an image can transition to another image by fading the opacity of one to reveal the other.
    * *Dissolve* - creates a smooth transition between elements that completely overlap one another, such as photos inside a card or other container. A foreground element fades in (appears) or out (disappears) to show or hide an element behind it.
    * *Cross-dissolve* - involves two elements fading simultaneously: one fades in while the other fades out. It depicts two elements shown together during a portion of the transition, along with whatever is behind them. This overlap of multiple surfaces may be distracting.
    * *Fade through* - involves one element fading out completely before a new one fades in. These transitions can be applied to text, icons, and other elements that don't perfectly overlap. This technique lets the background show through during a transition, and it can provide continuity between screens when paired with a shared transformation.
* Shared transformation
    * involves synchronizing element movements to enhance continuity. for example if a FAB suddenly displays a different icon, it could be distracting. A shared transformation smoothly expresses a change in icons while the icons are in motion.


## Animation

### Easing
Easing is a way to adjust an animation's rate of change. Easing allows elements to speed up and slow down, rather than moving at a constant rate. Easing makes elements move as though influenced by natural forces like friction.

<p style="color: green"><b>Do</b></p>
Use easing that allows elements to speed up and slow down together. The acceleration of these elements is synchronized, creating an unified impression.

<p style="color: red"><b>Don't</b></p>
Avoid speeding up elements that should be slowing down, which creates a disorganized impression.

**Types**
* standard easing
    * puts subtle attention at the end of an animation, by giving more time to decelaration than acceleration. It's the most common form of easing.
    * Elements that begin and end at rest use standard easing. They speed up quickly and slow down gradually, in order to emphasize the end of the transition.
* accelerate easing
    * elements exiting a screen use acceleration easing, where they start at rest and end at peak velocity. ease-in
* decelerate easing
    * incoming elements are animated using deceleration easing, which starts a transition at peak velocity (the fastest point of an element's movement) and ends at rest. ease-out