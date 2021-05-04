# Typescript Notes

## Interfaces
### `readonly` vs `const`
The easiest way to remember whether to use `const` or `readonly` is to ask whether you are using it as on a
variable or a property. Variables use `const` whereas properties use `readonly`.

### Excess property checks
Object literals get special treatment and undergo *excess property checking* when assigning them to other
variables, or passing them as arguments. If an object literal has any properties that the "target type" doesn't
have, you'll get an error.

Getting around these checks is actually really simple. The easiest method is to use a type assertion:
`let mySquare = createSquare({width: 100, opacity: 0.5} as SquareConfig);`

However, a better approach might be to add a string index signature if you're sure


## Classes

### `public`, `private`, and `protected` modifiers
* public by default. You may still mark a member `public` explicitly.
* ECMAScript Private Fields
  ```ts
  class Animal {
    #name: string;
  }
  ```
* ts also has it's own way to declare a member as being marked `private`, it cannot be accessed from outside of its
  containing class.
* the `protected` modifier acts much like the private modifier with the exception that members declared `protected`
  can also be accessed within deriving classes.
    * A constructor can also be marked `protected`. This means that the class cannot be instantiated outside of its
      containing class, but can be extended.

### `readonly`
You can make properties readonly by using the `readonly` keyword. Readonly properties must be initialized at their
declaration or in the constructor.

### Parameter properties
Parameter properties* let you create and initialize a member in 1 place. ex:

```ts
class Octupus {
  constructor(public name: string) {}
}
```

Parameter properties are declared by prefixing a constructor parameter with an accessibility modifier or `readonly`, or
both. Using `private` for a parameter property declares and initializes a private member.



## Type Assertions
Sometimes you will have information about the type of a value that TS can't know about. For example, if you're using
`document.getElementById`, TS only knows that this will return some kind of `HTMLElement`, but you might know that your
page will always have an `HTMLCanvasElement` with a given ID. In this situation, you can use a *type assertion* to specify
a more specific type:

`const myCanvas = document.getElementById('main_canvas') as HTMLCanvasElement;`

Like a type annotation, type assertions are removed by the compiler and won't affect the runtime behavior of your code.
You can also use the angle-bracket syntax (except if the code is in a `.txt` file), which is equivalent:

`const myCanvas = <HTMLCanvasElement>document.getElementById('main_canvas')`

TS only allows type assertions which convert to a more specific or less specific version of a type. Sometimes this
rule can be too conservative and will disallow more complex coercions that might be valid. If this happens, you can
use 2 assertions, first to `any` or `unknown`, then to the desired type:

`const a = (expr as any) as T;`
