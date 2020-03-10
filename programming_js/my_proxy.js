/*
the number 37 gets returned as the default value when the property
name is not in the object. It is using the get handler
*/
const handler = {
    get: function(obj, prop) {
        return prop in obj ? obj[prop] : 37;
    }
}

const p = new Proxy({}, handler);
p.a = 1;
p.b = undefined;

console.log(`p.a ${p.a}, p.b ${p.b}, p.c ${p.c}`);

/*
No-op forwarding proxy
We are using native JS to which our proxy will forward all operations that
are applied to it.
Note that while this "no-op" works for JS objects, it does not work for native
browser objects like DOM elements.
*/
const target = {};
const p2 = new Proxy(target, {});
p2.a = 37;
console.log(`p2.a ${p2.a} target.a ${target.a}`);