# Jasmine

## Your first suite

### Suites: describe your tests
The `describe(string, func)` is for grouping related specs, typically each test file has one at the top level.
The string parameter is for naming the collection of specs, and will be concatenated with specs to make a spec's
full name. This aids in finding specs in a large suite. If you name them well, your specs read as full sentences in
traditional BDD style.

### Specs
Specs are defined by calling the global Jasmine function `it(description, testFunction_optional, timeout_optional)`.
The `testFunction` is the function that contains the code of your test. If not provided the test will be pending.
The test function has an optional parameter `testFunction(doneFn_optional)` that is used to specify to Jasmine
that this callback is asynchronous and Jasmine should wait until it has been called before moving on.

A spec contains one or more expectations that test the state of the code. An expectation in Jasmine in an assertion that
is either true or false. A spec with all true expectations is a passing spec. A spec with one or more false expectations
is a failing spec.

### Expectations
Expectations are built with the `expect(actual)` which takes a value, called the actual. It is chained with a Matcher
function, which takes the expected value.

### Matchers
Any matcher can evaluate to a negative assertion by chaining the call to `expect` with a `not` before calling the matcher
`expect(false).not.toBe(true)`

### Setup and Teardown
To help a test suite DRY up any duplicated setup and teardown code, Jasmine provides the global `beforeEach`, `afterEach`,
`beforeAll`, and `afterAll` functions.

### The `this` keyword
Another way to share variables between a `beforeEach`, `it`, and `afterEach` is through the `this` keyword. Each spec's
`beforeEach`/`it`/`afterEach` has the `this` as the same empty object that is set back to empty for the next spec's
`beforeEach`/`it`/`afterEach`.

### Manually failing a spec
The `fail(message)` causes a spec to fail. It can take a failure message or an Error object as a parameter.

### Nesting describe blocks
Calls to `describe` can be nested, with specs defined at any level. 

### Disabling suites
Suites can be disabled with the `xdescribe()` function.

### Pending specs
Pending specs do not run, but their names will show up in the results as pending. Any spec declared with `xit` is
marked as pending. And if you call `pending(reason)` anywhere in the spec body, no matter the expectations, the spec
will be marked as pending.

### Spies
Jasmine has test double functions called spies. A spy can stub any function and tracks calls to it and all arguments. A
spy only exists in the `describe` or it `block` in which it is defined, and will be removed after each spec. There are
special matchers for interacting with spies.

You can define what the spy will do when invoked with `and`.

The `toHaveBeenCalled` matcher will pass if the spy was called.

The `toHaveBeenCalledTimes` matcher will pass if the spy was called the specified number of times.

The `toHaveBeenCalledWith` matcher will return true if the argument list matches any of the recorded calls to the spy.

#### `createSpy`
When there is not a function to spy on, `jasmine.createSpy` can create a bare spy. This spy acts as any other spy - tracking
calls, arguments, etc. But there is no implementation behind it.

#### `createSpyObj`
In order to create a mock with multiple spies, use `jasmine.createSpyObj` and pass an array of strings. It returns an object
that has a property for each string that is a spy.

#### Matching with more finesse
* `jasmine.any` - takes a constructor or class name as an expected value.
* `jasmine.anything` - returns true if the actual value is not `null` or `undefined`.
* `jasmine.objectContaining` - is for those times when an expectation only cares about certain key/value pairs in the actual.
* `jasmine.arrayContaining`
* `jasmine.stringMatching`

#### Async support
The functions that you pass to `beforeAll`, `afterAll`, `beforeEach`, `afterEach`, and `it` can be asynchronous. There are
3 different ways to indicate that a function is asynchronous: by taking an optional callback parameter, by returning a promise,
or by using the `async` keyword in environments that support it.

##### Using callbacks
Calls to `beforeAll`, `afterAll`, `beforeEach`, `afterEach`, and `it` can take an optional single argument that should be
called when the async work is complete.

## Spying on properties
Properties are more complicated 
