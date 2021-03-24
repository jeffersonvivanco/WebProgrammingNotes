interface Student{
    fullname: string;
    age?: number; // optional property
    [propName: string]: any;
}

let jeff: Student = {
    fullname: '',
    age: 23,
    university: 'NYU'
}

// functions
interface SearchFunc{
    (source:string, subString: string): boolean;
}
let mySearch: SearchFunc;
mySearch = function(source: string, subString: string ){
    let result = source.search(subString);
    return result > -1;
}

// indexable types
// TS comes with an ReadonlyArray<T> type that is the same as Array<T> with all mutating
// methods removed, so you can make sure you don't change the arrays after creation
interface ReadonlyStringArray{
    readonly [index: number]: string; // property is only modifiable when object is created
}
let myArray: ReadonlyStringArray = ['Alice', 'Bob'];

// Hybrid types - example of an object that acts as both as an object and a function
interface Counter{
    (start: number): string;
    interval: number;
    reset(): void;
}
function getCounter(): Counter{
    let counter = <Counter>function (start:number){ 
        return 'Hello';
    };
    counter.interval = 123;
    counter.reset = function(){ };
    return counter;
}
let c = getCounter();
c(10);

let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
// a = ro; // the type 'readonly number[]' is 'readonly' and cannot be assigned to the mutable type 'number[]'
// you can override with a type assertion though
a = ro as number[];
