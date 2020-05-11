# Typescript Notes

## Classes

### `public`, `private`, and `protected` modifies
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

