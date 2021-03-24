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

