# Typescript Notes



## language specific
* types: boolean, number, string, array, tuple, enum, any, void, undefined, null, never
* enum: by default, enums begin numbering their members at 0, can be changed to anything a handy feature of enums is that you    can also go from a numeric value to the name of that value in the enum.
* void: You may commonly see this as the return type of functions that do not return a value. Declaring variables of type void
  is not useful because you can only assign undefined or null to them.
* null & undefined: By default, null and undefined are subtypes of all other types, so you can assign it to like number.
  However, when using the --strictNullChecks flag, null and undefined are only assignable to void and their respective types.
  This helps avoid many common errors. In cases, where you want to pass in either a string or null or undefined, you can use
  the union type string | null | undefined. ***NOTE: Typescript encourages the use of --strictNullChecks when possible
* never: The never type represents the type of values that never occur. For instance, never is the return type for a function
  expression or an arrow function expression that always throws an exception or one that never returns. Variables also aquire
  the type never when narrowed by any type guards that can never be true. The never type is a subtype of, and assignable to, 
  every type; however, no type is a subtype of, or assignable to never except never itself.
* type assertions: Type assertions are a way to tell the compiler, trust me I got this. Is like a type cast in other
  languages.

## My notes
* Destructuring: ===> see destructuring.ts
* Spread: allows you to spread arrays and objects into other arrays and objects. ===> see destructuring.ts
  IMPORTANT: Object spread only includes an object's own enumerable properties, this means you lose methods when you spread
  instances of an object.
* Interfaces: ===> look at my_interfaces.ts
  * Readonly Properties: Some properties should only be modifiable when an object is first created. You can specify this by
    putting readonly before the name of the property.
  * Typescript comes with a ReadonlyArray<T> type that is the same as Array<T> with all mutating methods removed so you can
    make sure you don't change your array after.
  * NOTE: variables use const whereas properties use readonly
  * interfaces are also capable of describing function types 
  * Indexable types: Similarly to how we can use interfaces to describe function types, we can also describe types that we can
    index into like a[10], or ageMap["daniel"]. Indexable types have an index signature that describes the types we can use to
    index into the object, along with the corresponding return types when indexing.
  * Interfaces describe the public side of the class, rather than both the public and private side.
  * Interfaces extending classes: When an interface type extends a class type it inherits the members of the class but not
    their implementations. It is as if the interface had declared all of the members of the class without providing an
    implementation. Interfaces inherit even the private and protected members of a base class.
* Classes
  * Public, Protected, and Private Modifiers
    * Each member is public by default.
    * When a member is marked private, it cannot be accessed outside of its containing class. 
    * The protected modifier acts much like the private modifier with the exception that members declared protected can also
      be accessed by instances of deriving classes.
    * A constructor may also be marked protected. This means that the class cannot be instantiated outside of its containing
      class, but can be extended.
    * You can make properties readonly by using the readonly keyword. Readonly properties must be initialized at their
      declaration or in the constructor.
    * Parameter properties let you create and intialize a member in one place. In the constructor, you can declare it like so
      ex => constructor(readonly name: string). This creates and initalizes the name member. Parameter properties are declared
      by prefixing a constructor parameter with an accessiblity modifier or readonly or both.
    * Accessors

### Modules
In typescript, as in ECMAScript 2015, any file containing a top-level `import` or `export` is considered a module. Conversely,
a file without any top-level `import` or `export` declarations is treated as a script whose contents are available in the
global scope (and therefore to modules as well).

* **Export**
  * *Exporting a declaration* - Any declaration (such as a variable, function, class, type alias, or interface) can be exported by adding the `export` keyword. => look at at `modules_practice/app.ts`.
  * *Export statements* - export statements are handy when exports need to be renamed for consumers.
  ex: `export { GreetingService as Greeting }`;
  * *Re-exports* - often modules extend other modules, and partially expose some of their features. A re-export does not
  export it locally, or introduce a local variable.
  ex: `export { ZipCodeValidator as RegExpBasedZipCodeValidator } from "./ZipCodeValidator";`
  * Optionally, a module can wrap one or more modules and combine all their exports using
  `export * from 'module';`

* **Import**
  * *Import a single export from a module* - => look at at `modules_practice/app.ts`.
    * imports can also be renamed ex: `import { ZipCodeValidator as ZCV } from "./ZipCodeValidator";`
  * *Import the entire module into a single variable, and use it to access module exports
  ex: `import * as validator from "./ZipCodeValidator";`
  * *Import a module for side-effects only* - though not recommeded practice, some modules set up some global state that can
  be used by other modules. These modules may not have any exports, or the consumer is not interested in any of their exports.
  To import these modules use: `import './my-module.js';`

* **Default Exports** - each module can optionally export a `default` export. Default exports are marked with the keyword `default`
and there can be only 1 `default` export per module. `default` exports are imported using a different import form.

    
