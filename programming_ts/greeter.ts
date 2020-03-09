// Intro to typescript

// function
function greeter(person:Person){
    return `Hello ${person.firstName} ${person.lastName}`;
}

// interface (No constructor)
interface Person{
    firstName: string;
    lastName: string;
}

class Student {
    fullName: string;
    constructor(public firstName: string, public lastName: string){
        this.fullName = firstName + ' ' + lastName;
    }
}

let user = new Student('Jefferson', 'Vivanco');

// using a generic type
let list: Array<number> = [1, 2, 3];

/* 

tuple, can add as many elements as long as is string or number

*/
let x: [string, number];
x = ['hello', 3];
x[2] = 'Yo';

/*

enum
* by default, enums begin numbering their members at 0, can be changed to anything
*/
enum Color {Red=1, Green=2, Blue=3};
let c: Color = Color.Green;

/*
Type assertions 
*/
// Angle bracket syntax
let someValue: any = 'Hello';
let strLength = (<string>someValue).length;
// as syntax (when using with JSX, only one allowed)
let strLength2 = (someValue as string).length;
