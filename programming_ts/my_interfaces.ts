interface Student{
    fullname: string;
    age: number;
    [propName: string]: any;
}

let jeff: Student = {
    fullname: 'Jefferson Vivanco',
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
interface ReadonlyStringArray{
    readonly [index: number]: string;
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