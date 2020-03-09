class Person {
    name: string;
    age: number;

    constructor(name, age){
        this.name = name;
        this.age = age;
    }
}

let contactList = new Map<string, Person>();
contactList.set('Jeff', new Person('Jeff', 23));
contactList.set('Zen', new Person('Zen', 21));

console.log(contactList.get('Jeff'));

for(let [key, value] of contactList){
    console.log(key, value);
}