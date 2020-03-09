/*
* A decorator is a special kind of declaration that can be attached to a class declaration, method, accessor, property,
or parameter.
*/


// Method Decorators
function test1(){
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor){
        console.log('[Debug] Hello World!');
    }
}

class Ferret {

    @test1()
    greet(){
        console.log('[Info] Hi, I am buzz!');
    }
}

let buzz = new Ferret();
buzz.greet();