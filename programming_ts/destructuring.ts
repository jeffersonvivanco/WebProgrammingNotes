// Array destructuring
let input = [1, 2];
let [first, second] = input;

// destructuring also works with already declared variables
// swapping values
[first, second]  = [second, first];


function f([first, second]:[number, number]){
    console.log(first);
    console.log(second);
}

// you can create a variable for the remaining items in a list using the syntax ...
let [firstNum, ...rest] = [1, 2, 3, 4];

// destructuring objects
let student = {
    age: 23,
    nickname:'Jeff',
    education: 'NYU'
}
let {age, ... restInfo} = student;

// property renaming
let {nickname: fullname, age: years} = student;

/*
destructuring with functions
* First, you need to remember to put the pattern before the default value
* Then, you need to remember to give a default for optional properties on the destructured property
  instead of the main initializer.
*/
function f2({a, b=0} = {a: ""}){
    // do something
}