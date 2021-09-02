# My Javascript Notes
by Jefferson Vivanco

## Chrome Console

### Log Messages
To style logs, add css style string as second arg and add `%c` to the beginning of the string message
``` js
console.log('%cJefferson Vivanco', 'background-color: green; color: white; padding: 15px; font-size: 2em; font-weight: bold; border-radius: 20px; margin-left: 40%; font-family: serif');
```

* `console.assert()` - writes an error to the console when expression evaluates to false (error)
* `console.clear()` - clears the console
* `console.count()` - writes the number of times that `count()` has been invoked at the same line and with the same label.
Call `console.countReset([label])` to reset the count. (info)
* `console.debug()` - identical to `console.log()`  (info)
* `console.dir(object)` - prints a JSON representation of the specified object (info)
* `console.dirxml(node)` - prints an XML representation of the descendants of `node` (info)
* `console.error(object)` - prints `object` to the console, formats it as an error, and includes a stack trace (error)
* `console.group(label)` - visually groups messages together until `console.groupEnd(label)` is called. Use 
`console.groupCollapsed(label)` to collapse the group when it's initially logged to the console
* `console.info(object)` - identical to `console.log()` (info)
* `console.log()` - prints a message to the console (info)
* `console.warn()` - prints a warning to the console (warn)
* `console.trace()` - logs stack trace
* `console.table()` - logs table, pass array of objects (info)
* `console.time(label)` - starts a new timer. Call `console.timeEnd(label)` to stop the timer and print the elapsed time to
the console. (info) 

### Console Utilities API Reference
Warning: These functions only work when you call them from the Chrome DevTools Console. They wont work if you try to call them
in your scripts.
* `$_` - returns the value of the most recently evaluated expression
* `$0`, `$1`, `$2`, `$3`, and `$4` - these commands work as a historical reference to the last five DOM elements inspected
within the Elements panel or the last five JS heap objects selected in the Profiles panel. `$0` returns the most recently
selected element or JS object.
* `$(selector)` - returns the reference to the first DOM element with the specified CSS selector. Alias for `querySelector()`.
This function also supports a second parameter, startNode, that specifies an `element` or Node from which to search for
elements. The default value of this parameter is `document`. Use `$$(selector)` to get multiple elements
* `$x(path)` - returns an array of DOM elements that match the given XPath expression. Ex: `$x('//p')` gets all `<p>` 
elements. `$x('//p[a]')` returns all the `<p>` elements that contain `<a>` elements. This function also has an optional
second parameter, `startNode`, that specifies an element or Node from which to search for elements.
* `copy(object)` - copies a string representation of the specified object to the clipboard
* `debug(function)` - when the specified function is called, the debugger is invoked and breaks inside the function on the
Sources panel allowing to step through the code and debug it. Use `undebug(function)` to stop breaking on the function, or use
the UI to disable all breakpoints.
* `dir(object)` - alias to `console.dir()`. Note, use this when printing a dom element.
* `dirxml(object)` - alias to `console.dirxml()`
* `inspect(object/function)` - opens and selects the specified element or object in the appropriate panel: either the Elements
panel for DOM elements or the Profiles panel for JS heap objects.
* `getEventListeners(object)` - returns the event listeners registered on the specified object. The return value is an object
that contains an array for each registered event type (ex: `click` or `keydown`).
* `keys(object)` - returns an array containing the names of the properties belonging to the specified object. To get the 
associated values of the same properties, `use values()`.
* `monitor(function)` - when the function specified is called, a message is logged to the console that indicates the function name 
along with the arguments that are passed to the function when it was called. Use `unmonitor(function)` to cease monitoring.
* `monitorEvents(object, [events])` - when one of the specified events occurs on the specified object, the Event object is logged
to the console. You can specify a single event to monitor, an array of events, or one of the generic event "types" mapped to a
predefined collection of events. ex: `monitorEvents(window, 'resize')`, `monitorEvents(window, ['resize', 'scroll'])`. Use
`unmonitorEvents(object, [events])` to unmonitor events.

| Event type | Corresponding mapped events |
| --- | --- |
| mouse | mousedown, mouseup, click, dblclick, mousemove, mouseover, mouseout, mousewheel |
| key | keydown, keyup, keypress, textInput |
| touch | touchstart, touchmove, touchend, touchcancel |
| control | resize, scroll, zoom, focus, blur, select, change, submit, reset |

* `profile(name)` and `profileEnd(name)` - starts a JS CPU profiling session with an optional name. `profileEnd()` completes the profile and
displays the results in the Profile panel.
* `table(data)` - similar to `console.table()`
* 

### Running JS
* You can run JS in the console to interact with the page you are inspecting. Modifying the page from the console is possible because the console has full access to the page's `window`.
* DevTools has a few convenience functons that make it easier to inspect a page.
  * `debug(nameOfFunction)` - suppose that your JS contains a function called `hideModal`. Running `debug(hideModal)` pauses your code on the first line of
  `hideModal` the next time it's called.

## The Intersection Observer API
Provides a way to asynchronously observe changes in the intersection of a target element with an ancestor element or with a top
level document's viewport.
* `IntersectionObserver`
  * `observe(e)` - tells the `InteractionObserver` a target element to observe
  * `disconnect()` - stops the `InteractionObserver` object from observing any target
  * `unobserve(e)` - tells the `InteractionObserver` to stop observing a particular target element
Look at intersectionObserverAPI.html


## ES6

### Blocks
In ES6, you can simply use a block if you want to restrict the scope of a variable. ex:
```js
{
    let temp = 'hello';
}
console.log(temp); // reference error
```

### Rest parameters
If you want a function to accept an arbitrary number of arguments, you can declare a rest parameter via the `...` operator.
```js
function format(pattern, ...args){
    // ...
}
```

### Spread operator and Arrays
You can turn arrays into parameters using the spread operator. ex: max(), push()

### Method definitions in object literals
In JS, methods are properties whose values are functions. ES6 has method definitions, special syntax for creating methods.
```js
const obj = {
    foo() {

    },
    bar() {
        this.foo();
    }
}
```

### Subclasses of error
```js
class MyError extends Error {

}
```

### Generators
You can think of generators as processes that you can pause and resume:
```js
function* getFunc(){
    console.log('A');
    yield;
    console.log('B');
}
```
* `yield` is an operator with which a generator can pause itself. Additionally, generators can also receive input and send output via
`yield`.
* When you call a generator function `getFunc()`, you get a *generator object* `genObj` that you can use to control the
  process: `const genObj = getFunc()`.  The process is initially paused in line A. `genObj.next()` resumes execution, a
  `yeild` inside `getFunc()` pauses execution.

#### Kinds of generators
There are 4 kinds of generators:
1. Generator function declarations:
   ```js
   function* genFunc() { /* ... */}
   const getObj = genFunc();
   ```
2. Generator function expressions:
   ```js
   const genFunc = function* () {/*...*/}
   const genObj = genFunc();
   ```
3. Generator method definitions in object literals:
   ```js
   const obj = {
     * generatorMethod() {/*...*/}
   }
   const genObj = obj.generatorMethod();
   ```
4. Generator method definitions in class definitions (class declarations of class expressions)
   ```js
   class MyClass {
     * generatorMethod() {/*...*/}
   }
   const myInst = new MyClass();
   const genObj = myInst.generatorMethod();
   ```
   
#### Use cases

##### Implementing iterables
* Ways of iterating over a generator
  * `for-of` loop
  * the spread operator
  * destructuring
* Ex: Iterating over properties
```js
function* objectEntries(obj){
    const propKeys = Reflect.ownkeys(obj);
    for(const propKey of propKeys){
        yield [propKey, obj[propKey]];
    }
}

const jane = {first: 'Jane', last: 'Doe'};
for (const [key, value] of objectEntries(jane)){
    console.log(`${key}: ${value}`);
}
```
* Recursion via `yield*`
  * You can only use `yield` within a generator function. Therefore, if you want to implement a recursive algorithm with generator,
  you need a way to call one generator from another one. You can use `yield*` for making recursive generator calls.
  ```js
  function* foo(){
      yield 'a';
      yield 'b';
  }

  function bar(){
      yield 'x';
      yield* foo();
      yield 'y';
  }
  ```
  * The operand of `yield*` does not have to be a generator object, it can be any iterable.
  * `yield*` considers end-of-iteration values
  
#### Use cases

## Custom Event
* Properties
  * `CustomEvent.detail` - Any data passed when initializing the event.
  * `Event.bubbles` - A Boolean indicating whether the event bubbles up through the DOM or not
  * `Event.cancelBubble` - A historical alias to `Event.stopPropagation()`. Setting its value to `true` before
  returning from an event handler prevents propagation of the event.
  * `Event.cancelable` - A Boolean indicating whether the event is cancelable.
  * `Event.type` - the name of the event
* Methods
  * `Event.preventDefault()` - cancels the event (if it is cancelable)
  * `Event.stopPropagation()` - stops the propagation of events further along in the DOM

### EventTarget.addEventListener()
The `EventTarget` method `addEventListener()` sets up a function that will be called whenever the specified event is
delivered to the target. Common targets are `Element`, `Document`, and `Window`, but the target may be any object that
supports events (such as `XMLHttpRequest`)
* Params
  * `type` - a case-sensitive string representing the event type to listen for
  * `listener` - the object which receives a notification (an object that implements the `Event` interface) when an
  event of the specified type occurs. This must be an object implementing the `EventListener` interface, or a JS function.
  * `options` - an options that specifies characteristics about the event listener. The available options are:
    * `capture` - A Boolean indicating that events of this type will be dispatched to the registered listener before being
    dispatched to any `EventTarget` beneath it in the DOM tree.
    * `once` - A Boolean indicating that the listener should be invoked at most once after being added. If true, the listener
    would be automatically removed when invoked.
    * `passive` - A Boolean which, if `true`, indicates that the function specified by the listener will never call
    `preventDefault()`. If a passive listener does call `preventDefault()`, the user agent will do nothing other than
    generate a console warning.
* `useCapture` - A Boolean  indicating whether events of this type will be dispatched to the registered listener before
being dispatched to any `EventTarget` beneath it in the DOM tree. Events that are bubbling upward through the tree will
not trigger a listener designated to use capture. Event bubbling and capturing are two ways of propagating events which
occur in an element that is nested within another element, when both elements have registered a handle for that event. The
event propagation mode determines the order in which elements recieve the event. If not specified, `useCapture` defaults
to `false`. Note: `useCapture` has not always been optional. Ideally, you should include it for the widest possible browser
compatibility.

* Why use `addEventListener`?
  * It allows adding more than a single handler for an event. This is particularly useful for AJAX libraries, JS modules, or any
  other kind of code that needs to work well with other libraries/extensions.
  * It gives you finer-grained control of the phase when the listener is activated (capturing vs bubbling).
  * It works on any DOM element, not just HTML elements.

* Multiple Identical event listeners
  * If multiple identical `EventListener`s are registered on the same `EventTarget` with the same parameters, the duplicate instances
  are discarded. They do not cause the `EventListener` to be called twice, and they do not need to be removed manually with the 
  `removeEventListener` method. Note however than when using an anonymous function as the handler, such listeners will not be identical
  since anonymous functions are not identical even if defined using the same unchanging source-code simply called repeatedly, even if
  in a loop.

* The value of `this` within the handler
  * If attaching a handler function to an element using `addEventListener`, the value of `this` inside the handler is a reference to the
  element. It is the same as the value of the `currentTarget` property of the event argument that is passed to the handler.
  * As a reminder, arrow functions do not have their own `this` context.

* Specifying `this` using `bind()`
  * The function `Function.prototype.bind()` method lets you specify the value that should be used as `this` for all calls to a given function.
  * Another solution is using a special function called `handleEvent()` to catch any events.
  ```js
  var Something = function(element) {
      // ...
      this.handleEvent = function(event) {
          // ...
      }
      element.addEventListener('click', this, false);
  }
  ```
  * Another way of handling the reference to `this` is to pass to the `EventListener` a function that calls the method of the object
  which contains the fields that need to be accessed.
  ```js
  class SomeClass {
    constructor() {
        this.name = 'Something Good';
    }
    register() {
        var that = this;
        window.addEventListener('keydown', function(e) {return that.someMethod(e);});
    }
    someMethod(e) {
        // ...
    }
  }
  ```
* Getting data into and out of an Event Listener
  * Getting data into an Event Listener using `this`
  ```js
    var myButton = document.getElementById('my-button-id');
    var someString = 'Data';
    myButton.addEventListener('click', function () {
    console.log(this);  // Expected Value: 'Data'
    }.bind(someString));
  ```
  * Getting data into an Event Listener using the outer scope property
  ```js
    var myButton = document.getElementById('my-button-id');
    var someString = 'Data';
    myButton.addEventListener('click', function() {
    console.log(someString);  // Expected Value: 'Data'
    someString = 'Data Again';
    });
    console.log(someString);  // Expected Value: 'Data' (will never output 'Data Again')
  ```
  * Getting data into and out of an Event Listener using Objects
    * Unlike most functions in JS, objects are retained in memory as long as a variable referencing them exists in memory.
    This, and the fact that objects can have properties, and that they can be passed around by reference, makes them likely
    candidates for sharing data among scopes. Functions in JS are actually objects. (Hence they too can have properties, and
    will be retained in memory even after they finish executing if assigned to a variable that persists in memory.)
    ```js
    var myButton = document.getElementById('my-button-id');
    var someObject = {aProperty: 'Data'};

    myButton.addEventListener('click', function() {
    console.log(someObject.aProperty);  // Expected Value: 'Data'

    someObject.aProperty = 'Data Again';  // Change the value
    });

    window.setInterval(function() {
    if (someObject.aProperty === 'Data Again') {
        console.log('Data Again: True');
        someObject.aProperty = 'Data';  // Reset value to wait for next event execution
    }
    }, 5000);
    ```
* Older way to register event listeners
  * `addEventListener` was introduced with the DOM 2 Events specification. Before then, event listeners were registered as follows:
  ```js
    // Passing a function reference — do not add '()' after it, which would call the function!
    el.onclick = modifyText;

    // Using a function expression
    element.onclick = function() {
    // ... function logic ...
    };
  ```
  * This method replaces the existing `click` event listener(s) on the element, if there are any. Other events and associated event handlers
  such as `blur` (`onblur`) and `keypress` (`onkeypress`) behave similarly.
  * Because it was essentially part of DOM 0, this technique for adding event listeners is very widely supported and requires no special
  cross-browser code. It is normally used to register event listeners dynamically unless the extra features of `addEventListener` are needed.

* Memory issues
```js
var i;
var els = document.getElementsByTagName('*');


// Case 1
for(i=0 ; i < els.length; i++){
  els[i].addEventListener("click", function(e){/*do something*/}, false);
}


// Case 2
function processEvent(e){
  /* do something */
}

for(i=0 ; i < els.length; i++){
  els[i].addEventListener("click", processEvent, false);
}
```
  * In the first case above, a new (anonymous) handler function is created with each iteration of the loop. In the second case, the
  same previously declared function is used as an event handler, which results in smaller memory consumption because there's only
  one handler function created. Moreover, in the first case, it is not possible to call `removeEventListener` because no reference
  to the anonymous function is kept (or here, not kept to any of the multiple anonymous functions the loop might create). In the second
  case, it's possible to `myElement.removeEventListener("click", processEvent, false)` because `processEvent` is the function reference.
  * Actually, regarding memory consumption, the lack of keeping a function reference is not the real issue; rather it is the lack of
  keeping a static function reference. In both problem-cases below, a function reference is kept, but since it is redefined on each iteration,
  it is not static. Though appearing to be simply multiple identical event listeners, in both cases each iteration will instead create a new
  listener with its own unique reference to the handler function. However, since the function definition itself does not change, the same
  function may still be called for every duplicate listener (especially if the code gets optimized). Also in both cases, because the function
  reference was kept but repeatedly redefined with each add, the remove-statement from above can still remove a listener, but now only the
  last one added.
  ```js
  // For illustration only: Note "MISTAKE" of [j] for [i] thus causing desired events to all attach to SAME element
  // Case 3
  for(var i=0, j=0 ; i<els.length ; i++){
    /* do lots of stuff with j */
    els[j].addEventListener("click", processEvent = function(e){/*do something*/}, false);
  }
  // Case 4
  for(var i=0, j=0 ; i<els.length ; i++){
  /* do lots of stuff with j */
    function processEvent(e){/*do something*/};
    els[j].addEventListener("click", processEvent, false); 
  }
  ```
* Improving scrolling performance with passive listeners
  * According to the specification, the default value of the `passive` option is always false. However, this introduces the potential for
  event listeners handling certain touch events, (among others) to block the browser's main thread while it is attempting to handle scrolling,
  resulting in possibly enormous reduction in performance during scroll handling. To prevent this problem, some browsers like Chrome and Firefox
  have changed the default value of the `passive` option to `true` for the `touchstart` and `touchmove` events on the document-level nodes `Window`,
  `Document`, and `Document.body`. This prevents the event listener from being called, so it can't block page rendering while the user is scrolling.

## Modules

### Modules
A module is a piece of a program that specifies which other pieces it relies on and which functionality
it provides for other modules to use (its interface). 
* The relations between modules are called dependencies. When a module needs a piece from another module,
it is said to be depend on that module. When this fact is clearly specified in the module itself, it can
be used to figure out which other modules need to be present to be able to use a given module and to
automatically load dependencies. To seperate modules in that way, each needs its own private scope. Just
putting your JS code into a different files does not satisfy these requirements. The files will share the
same global namespace. They can, intentionally or accidentally, interfere with each other's bindings.

### Packages
A package is a chunk of code that can be distributed (copied and installed). It may contain one or more
modules and has information about which other packages it depends on. A package also usually comes with
documentation explaining what it does so that people who didn't write it might still be able to use it.
* When a problem is found in a package or a new feature is added, the package is updated. Now the programs
that depend on it (which may also be packages) can upgrade to the new version.
* Working in this way requires infrastructure. We need a place to store and find packages and a convenient
way to install and upgrade them. In the JS world, this infrastructure is provided by NPM.
* NPM is two things
  * An online service where one can download (and upload) packages
  * A program (bundled with Node.js) that helps you install and manage them

* Improvised Modules - Until 2015, the JS language had no built-in module system. Yet people had been building
large systems in JS for more than a decade, and they needed modules. So they designed their own module systems
on top of the language.
  * You can use JS functions to create local scopes and objects to represent module interfaces.
  * This is a module for going between day names and numbers (as returned by `Date`'s `getDay` method). Its
  interface consists of `weekDay.name` and `weekDay.number`, and it hides its local binding `names` inside the
  scope of a function expression that is immediately invoked.
  ```js
  const weekday = function() {
    const names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return {
      name(number) { return names[number];},
      number(name) { return names.indexOf(name);}
    }
  }();
  ```
  * This style of modules provides isolation, to a certain degree, but it does not declare dependencies. Instead,
  it just puts its interface into the global scope and expects its dependencies, if any, to do the same. For a
  long time this was the main approach used in web programming, but it is mostly obsolete now.
  * If we want to make dependency relations part of the code, we'll have to take control of loading dependencies.
  Doing that requires being able to execute strings as code. JS can do this.

* Evaluating Data as Code
  * There are several ways to take data (a string of code) and run it as part of the current program. The most
  obvious way is the special operator `eval`, which will execute a string in the current scope. This is usually
  a bad idea because it breaks some of the properties that scopes normally have, such as being easily predictable
  which binding a given name refers to.
  ```js
  const x = 1;
  function evalAndReturnX(code) {
    eval(code);
    return x;
  }
  console.log(evalAndReturnX('var x = 2')); // 2
  console.log(x); // 1
  ```
  * A less scary way of interpreting data as code is to use the `Function` constructor. It takes two arguments:
    * a string containing a comma-separated list of argument names and 
    * a string containing the function body.
  * It wraps the code in a function value so that it gets its own scope and won't do odd things with other scopes.
  ```js
  let plusOne = Function('n', 'return n + 1;');
  console.log(plusOne(4)); // 5
  ```
  * This is precisely what we need for a module system. We can wrap the module's code in a function and use that
  function's scope as module scope.

### CommonJS
The most widely used approach to bolted-on JS modules is called *CommonJS* modules. Node.js uses it and is the
system used by most packages on NPM.

* The main concept in CommonJS modules is a function called `require`. When you call this with the module name
of a dependency, it makes sure the module is loaded and returns its interface. Because the loader wraps the 
module code in a function, modules automatically get their own local scope. All they have to do is call
`require` to access their dependencies and put their interface in the object bound to `exports`. Ex:
```js
// format-date.js
const ordinal = require('ordinal'); // the interface of ordinal is a single function
const {days, months} = require('date-names'); // whereas date-names exports an object containing multiple things
exports.formatDate = function(date, format) {
  return format.replace(/YYYY|M(MMM)?|Do?|dddd/g, tag => {
    if (tag === 'YYYY') return date.getFullYear();
    if (tag === 'M') return date.getMonth();
    if (tag === 'MMMM') return months[date.getMonth()];
    if (tag === 'D') return date.getDate();
    if (tag === 'Do') return ordinal(date.getDate());
    if (tag === 'dddd') return days[date.getDay()];
  });
}

// We can use the module like
const {formatDate} = require('./format-date');
```
* We can define `require`, in its most minimal form, like this:
```js
require.cache = Object.create(null);

function require(name) {
  if (!(name in require.cache)) {
    let code = readFile(name);
    let module = {exports: {}}
    require.cache[name] = module;
    let wrapper = Function('require, exports, module', code);
    wrapper(require, module.exports, module);
  }
  return require.cache[name].exports;
}
```
* In this code, `readFile` is a made-up function that reads a file and returns its contents as a string.
Standard js provides no such functionality--but different JS environments, such as browser and Node.js, provide
their own ways of accessing files. The example just pretends that `readFile` exists.
* To avoid loading the same module multiple times, `require` keeps a store (cache) of already loaded modules. When
called, it first checks if the requested module has been loaded and, if not, loads it. This involves reading the
module's code, wrapping it in a function, and calling it.
* The interface of the `ordinal` package we saw before is not an object but a function. A quirk of the CommonJS
modules is that, though the module system will create an empty interface object for you (bound to `exports`), you
can replace that with any value by overwriting `module.exports`. This is done by many modules to export a single
value instead of an interface object.
* By defining `require`, `exports`, and `module` as parameters for the generated wrapper function (and passing
the appropriate values when calling it), the loader makes sure that these bindings are available in the module's
scope.
* The way the string given to `require` is translated to an actual filename or web address differs in different
systems. When it starts with "./" or "../", it is generally interpreted as relative to the current module's
filename. So "./format-date" would be the file named `format-date.js` in the same directory.
* When the name isn't relative, Node.js will look for an installed package by that name in NPM.

### ECMAScript Modules
The main concepts of dependencies and interfaces remain the same, but the details differ. For one thing,
the notation is now integrated into the language. Instead of calling a function to access a dependency, you
use a special `import` keyword.
```js
import ordinal from 'ordinal';
import {days, months} from 'date-names';

export function formatDate(date, format) {/* ... */}
```
* Similarly the `export` keyword is used to export things. It may appear in front of a function, class, or
binding definition (`let`, `const`, or `var`).
* An ES module's interface is not a single value but a set of named bindings. The preceding module binds `formDate`
to a function. When you import from another module, you import the binding, not the value, which means an exporting
module may change the value of the binding at any time, and the modules that import it will see its new value.
* When there's a binding named `default`, it is treated as the module's main exported value. Such modules can still
export other bindings under different names alongside their `default` export. To create a default export, you write
`export default` before an expression, a function declaration, or a class declaration.
* It is possible to rename imported bindings using the word `as`. ex: `import {days as dayNames} from 'date-names';`
* Another important difference is that ES module imports happen before a module's script starts running. That means
`import` declarations may not appear inside functions or blocks, and the names of dependencies must be quoted
strings, not arbitrary expressions.

### Building and Bundling
In fact, many JS projects aren't even, technically, written in JS. There are extensions, such as the type checking
dialect, that are widely used. People also often start using planned extensions to the language long before they
have been added to the platforms that actually run JS.

* To make this possible, they *compile* their code, translating it from their chosen JS dialect to plain old JS--or
even to a past version of JS--so that old browsers can run it.
* Including a modular program that consists of 200 different files in a web page produces its own problems. If
fetching a single file over the network takes 50ms, loading the whole program takes 10s, or maybe half that if
you can load several files simultaneously. That's a lot of wasted time. Because fetching a single big file tends
to be faster than fetching a lot of tiny ones, web programmers have started using tools that roll their programs
(which they painstakingly split into modules) back into a single big file before they publish it to the web. Such
tools are called *bundlers*.
* And we can go further. Apart from the number of files, the *size* of the files also determines how fast they can
be transferred over the network. Thus, the JS community has invented *minifiers*. These are tools that take a JS
program and make it smaller by automatically removing comments and whitespace, renaming bindings, and replacing
pieces of code with equivalent code that take up less space.
* So it is not uncommon for the code that you find in an NPM package or that runs on a web page to have gone
through multiple stages of transformation--converted from modern JS to historic JS, from ES module format to
CommonJS, bundled and minified. Be aware that the JS code you run is often not the code as it was written.

### Module Design
Structuring programs is one of the subtler aspects of programming. Any non-trivial piece of functionality can
be modeled in various ways.

* Good program design is subjective--there are trade-offs involved and matters of taste. The best way to learn
the value of well-structured design is to read or work on a lot of programs and notice what works and what doesn't.
Don't assume that a painful mess is "just the way it is". You can improve the structure of almost everything by
putting more thought into it.
* One aspect of module design is ease of use. If you are designing something that is intended to be used by
multiple people--or even by yourself, in three months when you no longer remember the specifics of what you
did--it is helpful if your interface is simple and predictable. That may mean following existing converntions.
A good example is the `ini` package. This module imitates the standard `JSON` object by providing `parse` and
`stringify` (to write an INI file) functions, and, like `JSON`, converts between strings and plain objects.
So the interface is small and familiar, and after you've worked with it once, you're likely to remember how
to use it.
* Even if there's no standard function or widely used package to imitate, you can keep your modules
predicatable by using simple data structures and doing a single, focused thing. Many of the INI-file parsing
modules on NPM provide a function that directly reads such a file from the hard disk and parses it, for example.
This makes it impossible to use such modules in the browser, where we don't have direct fily system access, and
adds complexity that would have been better addressed by *composing* the module with some file-reading function.
* This points to another helpful aspect of module design--the ease with which something can be composed with other
code. Focused modules that compute values are applicable in a wider range of programs than bigger modules that
perform complicated actions with side effects. An INI file reader that insists on reading the file from disk is
useless in a scenario where the file's content comes from some other source. 
* Relatedly, stateful objects are sometimes useful or even necessary, but if something can be done with a
function, use a function. Several of the INI file readers on NPM provide an interface style that requires you
to first create an object, then load the file into your object, and finally use specialized methods to get
at the results. This type of thing is common in the object-oriented tradition, and it's terrible. Instead
of making a single function call and moving on, you have to perform the ritual of moving your object through
various states. An because the data is now wrapped in a specialized object type, all code that interacts with
it has to know about that type, creating uneccessary interdependencies. Often defining new data structures
can't be avoided--only a few basic ones are provided by the language standard, and many types of data have
to be more complex than an array or a map. But when an array suffices, use an array.
* This can be a barrier to composition--when various packages are using different data structures to describe
similar things, combining them is difficult. Therefore, if you want to design for composatibility, find out
what data structure other people are using, and, when possible, follow their example.

## Standard Built-in Objects

### Proxy
The `Proxy` object is used to define custom behavior for fundamental operations (e.g. property lookup,
assignment, enumeration, function invocations, etc.). ===> Look at `programming_js/my_proxy.js`

* Terminology
  * `handler` - placeholder object which contains traps
  * traps - the methods that provide access property access. This is anologous to the concept of traps
    in operating systems
  * target - object which the proxy virtualizes. It is often used as storage backend for the proxy.
    Invariants (semantics that remain unchanged) regarding object non-extensibility or non-configurable
    properties are verfied against the target.
* Syntax `const p = new Proxy(target, handler);`
  * `target` - a target object to wrap with `Proxy`. It can be any sort of object, including a native
    array, a function, or even another proxy.
  * `handler` - an object whose properties are functions define the behavior of proxy `p` whan an
    operation is performed on it.
* Methods
  * `Proxy.revocable(target, handler)` - creates a revocable proxy object.
* Methods of the handler object - the `handler` object is a placeholder object which contains traps
  for `Proxy`. All traps are optional. **If a trap has not been defined, the default behavior is to
  forward the operation to the target**.
  * `handler.getPrototypeOf(target)` - a trap for `Object.getPrototypeOf`
  * `handler.setPrototypeOf(target, prototype)` - a trap for `Object.setPrototypeOf`
  * `handler.isExtensible(target)` - a trap for `Object.isExtensible`
  * `handler.preventExtensions(target)` - a trap for `Object.preventExtensions`
  * `handler.getOwnPropertyDescriptor(target, prop)` - a trap for `Object.getOwnPropertyDescriptor`
  * `handler.defineProperty(target, property, descriptor)` - a trap for `Object.defineProperty`
  * `handler.has(target, prop)` - a trap for the `in` operator
  * `handler.get(target, property, receiver)` - a trap for getting property values
  * `handler.set(target, property, value, receiver)` - a trap for setting property values
  * `handler.deleteProperty(target, property)` - a trap for the `delete` operator
  * `handler.ownKeys(target)` - a trap for `Object.getOwnPropertyNames` and `Object.getOwnPropertySymbols`
  * `handler.apply(target, thisArg, argumentsList)` - a trap for a function call
  * `handler.construct(target, argumentsList, newTarget)` - a trap for the `new` operator

### Object
* Methods
  * `Object.create()` - creates a new object with the specified prototype object and properties
  * `Object.getOwnPropertyDescriptor()` - returns a property descriptor for a named property on an object
  * `Object.getPrototypeOf()` - returns the `prototype` of the specified object
  * `Object.assign()` - copies the values of all enumerable own properties from one or more source objects
    to a target object.

### Set
A `Set` object lets you store unique values of any type, whether primitive values or object references.
`Set` objects are collections of values. You can iterate through the elements of a set in insertion order.

* Constructor
  `new Set()` or `new Set(iterable)`

* Methods
  * `add(value)`
  * `clear()`
  * `delete(value)`
  * `has(value)`
  
* Iteration methods
  * `keys()` - returns a new iterator object that yields the values for each element in the `Set` object in insertion order.
  * `values()` - same as `keys()`
  * `forEach(callbackFn[, thisArg])`

## Control flow

### `switch`
```javascript
const expr = 'Papayas';
switch (expr) {
  case 'Oranges':
    console.log('Oranges are $0.59 a pound.');
    break;
  case 'Mangoes':
  case 'Papayas':
    console.log('Mangoes and papayas are $2.79 a pound.');
    break;
  default:
    console.log(`Sorry, we are out of ${expr}.`);
}
```
#### Block-scope variables within `switch` statements
```javascript
const action = 'say_hello';
switch (action) {
  case "say_hello": {
    let message = 'hello';
    console.log(message);
    break;
  }
  case 'say_hi': {
    let message = 'hi';
    console.log(message);
    break;
  }
  default: {
    console.log('empty action received');
    break;
  }
}
```


## Eloquent Javascript

### The secret life of Objects
#### Encapsulation
The core idea in object-oriented programming is to divide programs into smaller pieces and make each
piece responsible for managing its own state. This way, some knowledge about the way a piece of the
program works can be kept *local* to that piece. Someone working on the rest of the program does not
have to remember or even be aware of that knowledge. Whenever these local details change, only the
code directly around it needs to be updated. Different pieces of such a program interact with each
other through *interfaces*, limited sets of functions or bindings that provide useful functionality
at a more abstract level, hiding their precise implementation.

Such program pieces are modeled using objects. Their interface consists of a specific set of methods
and properties. Properties that are part of the interface are called *public*. The others, which
outside code should not be touching, are called *private*. Many languages provide a way to distinguish
public and private properties and prevent outside code from accessing the private ones altogether. JS
once again taking the minimilist approach does not--yet at least. There is work underway to add this
to the language. Even though the language doesn't have this disntinction built in, JS programmers are
successfully using this idea. Typically, the available interface is described in documentation or comments.
It is also common to put an underscore char `_` at the start of property names to indicate that
those properties are private.

Separating interface from implementation is a great idea. It is usually called *encapsulation*.

#### Methods
Methods are nothing more than properties that hold function values. Ex:
```js
let ferret = {};
ferret.speak = function(line) {
  console.log(`the ferret says ${line}`);
}
ferret.speak('I am alive!'); // the ferret says I am alive!
```

Usually a method needs to do something with the object it was called on. When a function is called
as a method--looked up as a property and immediately called, as in `object.method()`--the binding
called `this` in its body automatically points at the object it was called on.
```js
function speak(line) {
  console.log(`the ${this.name} says ${line}`);
}
let lion = {name: 'lion', speak};
lion.speak('Roooaar'); // the lion says Rooooar
```
You can think of `this` as an extra parameter that is passed in a different way. If you want to
pass it explicitly, you can use a function's `call` method, which takes the `this` value as its
first argument and treats further arguments as normal parameters. `speak.call(lion, 'Rooaarr');`

Since each function has its own `this` binding, whose value depends on the way it is called, you
cannot refer to the `this` of the wrapping scope in a regular function defined with the `function`
keyword.

Arrow functions are different--they do not bind their own `this` but can see the `this` binding
of the scope around them. Thus, you can do something like the following code, which references
`this` from inside a local function:
```js
function normalize() {
  console.log(this.coords.map(n => n / this.length));
}
normalize.call({coords: [0, 2, 3], length: 5});
```
If I had written the argument to `map` using the `function` keyword, the code wouldn't work.

#### Prototypes
In addition to their set properties, most objects also have a *prototype*. A prototype is
another object that is used as a fallback source of properties. When an object gets a request for a
property that it doesn't have, its prototype will be searched for the property, then the prototype's
prototype, and so on.

So who's the prototype of that empty object? It is the great ancestral prototype, the entity behind
almost all objects, `Object.prototype`.

The prototype relations of JS objects form a tree-shaped structure, and at the root of this structure
sits `Object.prototype`. It provides a few methods that show up in all objects, such as `toString`, which
converts an object to a string representation.

Many objects don't directly have `Object.prototype` as their prototype but instead have another object
that provides a different set of default properties. Functions derive from `Function.prototype` and
arrays derive from `Array.prototype`.

```js
// prototype
let protoFerret = {
  speak(line) {
    console.log(`the ${type} ferret says ${line}`);
  }
}
let funFerret = Object.create(protoFerret);
funFerret.type = 'fun';
funFerret.speak('heeeeyyy'); // the fun ferret says heeeeyyy
```
A property like `speak(line)` in an object expression is a shorthand way of defining a method. It
creates a property called `speak` and gives it a function as its value. The "proto" ferret acts as
a container for the properties that are shared by all ferrets. An individual ferret object, like
the funFerret, contains only properties that apply only to itself--in this case--its type--and derives
shared properties from its prototype.

#### Classes
JS's prototype system can be interpreted as a somewhat informal take on an object-oriented concept
called *classes*. A class defines the shape of a type of object--what methods and properties it
has. Such an object is called an *instance* of the class. 

Prototypes are useful for defining properties for which all instances of a class share the same value, such as methods. 
Properties that differ per instance, such as our ferret `type` property, need to be stored directly in the objects 
themselves.

So to create an instance of a given class, you have to make an object that derives from the proper prototype, but you
also have to make sure it, itself, has the properties that instances of this class are supposed to have. This is what a
*constructor* function does.
```js
function makeFerret(type) {
  let ferret = Object.create(protoFerret); //proto define above
  ferret.type = type;
  return ferret;
}
```
JS provides a way to make defining this type of function easier. If you put the keyword `new` in front of a function call,
the function is treated as a constructor. This means that an object with the right prototype is automatically created,
bound `this` in the function, and returned at the end of the function. The prototype object used when constructing objects
is found by taking the `prototype` property of the constructor function.
```js
function Ferret(type) {
  this.type = type;
}
Ferret.prototype.speak = function(line) {
  console.log(`${this.type} says line`);
}
let weirdFerret = new Ferret('weirddd');
```
Constructors (all functions, in fact) automatically get a property named `prototype`, which by default holds a plain,
empty object that derives from `Object.prototype`. You can overwrite it with a new object if you want. Or you can add
properties to the existing object, as the example does.

By convention, the names of constructors are capitalized so that they can easily be distinguished from other functions.

It is important to understand the distinction between the way a prototype is associated with a constructor (through its
`prototype` property) and the way objects have a prototype (which can be found with `Object.getPrototypeOf`). The actual
prototype of a constructor is `Function.prototype` since constructors are functions. Its `prototype` property holds the
prototype used for instances created through it.

#### Class Notation
So JS classes are constructor functions with a prototype property. ES6 classes are mostly just more convenient 
syntax for constructor functions:
```js
class Person {
    constructor(name){
        this.name = name;
    }
    describe(){
        // ...
    }
}
```
Like `function`, `class` can be used both in statements and in expressions. When used as an expression, it doesn't define
a binding but just produces the constructor as a value. You are allowed to omit the class name in a class expression.
```js
let object = new class { getWord() { return "hello"; }};
```

#### Getters, Setters, and Statics
Interfaces often consist mostly of methods, but it is also ok to include properties that hold non function values. It is
not even necessary for such an object to compute and store such a property directly in the instance. Even properties that
are accessed directly may hide a method call. Such methods are called *getters*, and they are defined by writing `get` in
front of the method name in an object expression or class declaration.
```javascript
let varyingSize = {
  get size() {
    return Math.floor(Math.random() * 100);
  }
}
```
Whenever someone reads from this object's `size` property, the associated method is called. You can do a similar thing
when a property is written to, using a *setter*.

Sometimes you want to attach some properties directly to your constructor function, rather than to the prototype. Such
methods won't have access to a class instance but can, for example, be used to provide additional ways to create instances.
Inside a class declaration, methods that have `static` written before their name are stored on the constructor.

#### Inheritance
The new class inherits properties and behavior from the old class.
```javascript
class SymmerticMatrix extends Matrix {
  constructor(size, element = (x, y) => undefined) {
    super(size, size, (x, y) => {
      if (x < y) return element(y, x);
      else return element(x, y);
    })
  }
  set(x, y, value) {
    super(x, y, value);
    if (x != y) {
      super.set(y, x, value);
    }
  }
}
```
The use of the word `extends` indicates that this class shouldn't be directly based on the default `Object` prototype but
on some other class. This is called the *superclass*. The derived class is the *subclass*.

Inheritance allows us to build slightly different data types from existing data types with relatively little work. It is
a fundamental part of object-oriented tradition, alongside encapsulation and polymorphism. But while the latter 2 are now
generally regarded as wonderful ideas, inheritance is more controversial. Whereas encapsulation and polymorphism can be
used to *separate* pieces of code from each other, reducing the tangleness of the overall program, inheritance fundamentally
ties classes together, creating more tangle. When inheriting from a class, you usually have to know more about how it
works than when simply using it. Inheritance can be a useful tool, but it shouldn't be the first tool you reach for,
and you probably shouldn't actively go looking for opportunities to construct class hierarchies (family trees of classes).

#### The `instanceof` operator
It is occasionally useful to know whether an object was derived from a specific class. For this, JS provides a binary
operator called `instanceof`. ex: `console.log(new SymmetricMatrix instanceof SymmetricMatrix) // true`. The operator will see
through inherited types, so a `SymmetricMatrix` is an instance of `Matrix`. The operator can also be applied to standard
constructors like `Array`. Almost every object is an instance of `Object`.

### Asynchronous programming

#### Callbacks
In a way, asychronicity is contagious. Any function that calls a function that works asynchronously must itself be
asynchronous, using a callback or similar mechanism to deliver its result. Calling a callback is somewhat more involved
and error-prone than simply returning a value, so needing to structure large parts of your program that way is not great.

#### Promises
A promise is an asynchronous action that may complete at some point and produce a value. It is able to notify anyone who
is interested when its value is available. 

The easiest way to create a promise is by calling `Promise.resolve`. This function ensures that the value you give it
is wrapped in a promise. If it's already a promise, it is simply returned--otherwise, you get a new promise that immediately
finishes with your value as its result.

```javascript
let fifteen = Promise.resolve(15);
fifteen.then(value => console.log(`value is ${value}`));
```

To get the result of a promise, you can use its `then` method. This registers a callback function to be called when the
promise resolves and produces a value. You can add multiple callbacks to a single promise, and they will be called, even
if you add them after the promise has already resolved (finished). But that's not all the `then` method does. It returns
another promise, which resolves to the value that the handler function returns or, if that returns a promise, waits for that
promise and then resolves to its result.

##### `Promise()` constructor
`new Promise(executor)`

Parameters
* `executor` - typically it works like this: The operation within `executor` is asynchronous and provides a callback. The
  callback is defined within the `executor` code. The callback terminates by invoking `resolutionFunc`. The invocation of
  `resolutionFunc` includes a `value` parameter. The value is passed back to the tethered `Promise` object. The `Promise`
  object (asynchronously) invokes any `.then()` associated with it. The `value` received by `.then()` is passed to the
  invocation of `handleFulfilled` as an input parameter.
  
  The `executor` might also include a `try{} catch()` block that invokes `rejectionFunc` upon error.

  The promise object will become "resolved" when either of the functions `resolutionFunc` or `rejectionFunc` are invoked.
  Note that if you call `resolutionFunc` or `rejectionFunc` and pass another Promise object as an argument, you can say that
  it is "resolved", but still cannot be said to be "settled".
  
##### Collections of Promises
When working with collections of promises running at the same time, the `Promise.all` function can be useful. It returns
a promise that waits for all of the promises in the array to resolve and then resolves to an array of the values that these
promises produced (in the same order as the original array). If any promise is rejected, the result of `Promise.all` is itself
rejected.

#### Async functions
JS allows you to write pseudo-synchronous code to describe asynchronous computation. An `async` function is a function that
implicitly returns a promise and that can, in its body, `await` other promises in a way that looks synchronous. Inside an
`async` function, the word `await` can be put in front of an expression to wait for a promise to resolve and only then continue
the execution of the function.
  
### Bugs and Errors

#### Exceptions

The `throw` keyword is used to raise an exception. Catching one is done by wrapping a piece of code in a `try` block, 
followed by the keyword `catch`. Ex:
```javascript
function test() {
  throw new Error('test error!');
}
try {
  const e = 'Hello World';
  const f = test();
} catch (e) {
  console.log('something went wrong', e);
}
```
The `Error` constructor is a standard JS constructor that creates an object with a `message` property. In most JS 
environments instances of this constructor also gather information about the call stack that existed when the exception
was created, a so-called *stack trace*. This information is stored in the `stack` property and can be helpful when trying
to debug a problem: it tells us the function where the problem occurred and which functions made the failing call.

#### Cleaning up after exceptions

The effect of an exception is another kind of control flow. Every action that might cause an exception, which is pretty
much every function call and property access, might cause control to suddenly leave your code. This means when code has
several side effects, even if its "regular" control flow looks like they'll always all happen, an exception might prevent
some of them from taking place. Even functions that don't look like they will throw an exception might do so in exceptional
circumstances or when they contain a programmer mistake.

One way to address this is to use fewer side effects. Again, a programming style that computes new values instead of
changing existing data helps. If a piece of code stops running in the middle of creating a new value, no one ever sees
the half-finished value, and there is no problem.

But that isn't always practical. So there's another feature that `try` statements have. They may be followed by a `finally`
block either instead of or in addition to a `catch` block. Ex:
```javascript
try {
  // something
} catch (error) {
  // something
} finally {
  // something
}
```
Note that even though the `finally` code is run when an exception is thrown in the `try` block, it does not interfere
with the exception. After the `finally` block runs, the stack continues unwinding.

Written programs that operate reliably even when exceptions pop up in unexpected places is hard. Many people simply don't
bother, and because exceptions are typically reserved for exceptional circumstances, the problem may occur so rarely that
it is never even noticed. Whether that is a good thing or a really bad thing depends on how much damage the software will
do when it fails.

#### Selective catching

When an exception makes it all the way to the bottom of the stack without being caught, it gets handled by the environment.
What this means differs between environments. In browsers, a description of the error typically gets written to the JS
console. Node.js, the browserless JS environment is more careful about data corruption. It aborts the whole process when
an unhandled exception occurs.

For programmer mistakes, just letting the error go through is often the best you can do. An unhandled exception is a
reasonable way to signal a broken program, and the JS console will, on modern browsers, provide you with some information
about which function calls were on the stack when the problem occurred.

*For problems that are expected to happen during routine use, crashing with an unhandled exception is a terrible strategy.*

Invalid uses of the language, such as referencing a nonexistent binding, looking up a property on `null`, or calling
something that's not a function, will also result in exceptions being raised. Such exceptions can also be caught.

As a general rule, don't blanket-catch exceptions unless it is for the purpose of "routing" them somewhere--for example,
over the network to tell another system that our program crashed. And even then, think carefully about how you might be
hiding information.

So we want to catch a specific kind of exception. We can do this by checking in the `catch` block whether the exception
we got is the one we are interested in and rethrowing it otherwise. We do this by defining a new type of `error` and use
`instanceof` to identify it.

```javascript
class InputError extends Error {}
// checking for error
try {
  // ...
}catch (e) {
  if (e instanceof InputError) {
    // ...
  } else {
    throw e;
  }
}
```

#### Assertions
Assertions are checks inside a program that verify that something is the way it is supposed to be. They are used not to
handle situations that can come up in normal operation but to find programmer mistakes. If for ex, `firstElement` is
described as a function that should never be called on empty arrays, we might write it like this:
```javascript
function firstElement(array) {
  if (array.length === 0) {
    throw new Error('firstElement called with []');
  }
  return array[0];
}
```
Now instead of silently returning undefined, this will loudly blow up your program as soon as you misuse it. This makes
it less likely for such mistakes to go unnoticed and easier to find their cause when they occur. It's not recommended to
write assertions for every possible kind of bad input. That'd be a lot of work and would lead to very noisy code. You'll
want to reserve them for mistakes that are easy to make (or that you find yourself making).

### Handling events
#### Debouncing
Some types of events have the potential to fire rapidly, many times in a row (the "mousemove" and "scroll" events for
example). When handling such events, you must be careful not to do anything too time-consuming or your handler will take
up so much time that interaction with the document starts to feel slow.

If you need to do something nontrivial in such a handler, you can use `setTimeout` to make sure you are not doing it too
often. This is usually called *debouncing* the event. There are several slightly different approaches to this.

In first example, we want to react when the user has typed something, but we don't want to do it immediately for every
input event. Instead of immediately performing an action in the event handler, we set a timeout. We also clear the previous
timeout (if any) so that when events occur close together (closer than our timeout delay), the timeout from the previous
event will be canceled.
```html
<textarea>Type something here...</textarea> 
<script>
let textarea = document.querySelector("textarea");
let timeout;
textarea.addEventListener("input", () => {
  clearTimeout(timeout);
  timeout = setTimeout(() => console.log("Typed!"), 500); 
});
</script>
``` 
Giving an undefined value to `clearTimeout` or calling it on a timeout that has already fired has no effect.













































