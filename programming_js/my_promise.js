// promise

let p = (val) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (val === 'Hello') resolve('Hi!');
    else reject('Fail!');
  }, 1000);
});


p('Hello').then(val => console.log(val)).then(() => {
  setTimeout(() => console.log('bye'), 1000);
});

// collection of promises

const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.resolve(3);
const promises = [p1, p2, p3];
Promise.all(promises).then(res => res.forEach(r => console.log(r)));
