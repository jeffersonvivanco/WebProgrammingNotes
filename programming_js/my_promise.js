// promise

// let p = (val) => new Promise((resolve, reject) => {
//   setTimeout(() => {
//     if (val === 'Hello') resolve('Hi!');
//     else reject('Fail!');
//   }, 1000);
// });
//
//
// p('Hello').then(val => console.log(val)).then(() => {
//   setTimeout(() => console.log('bye'), 1000);
// });
//
// // collection of promises
//
// const p1 = Promise.resolve(1);
// const p2 = Promise.resolve(2);
// const p3 = Promise.resolve(3);
// const promises = [p1, p2, p3];
// Promise.all(promises).then(res => res.forEach(r => console.log(r)));

function asyncTest1() {
  return new Promise((resolve, reject) => {
    resolve(1);
  }).then((val) => {
    console.log('val is test1', val);
  }).catch(error => {
    console.log('caught error', error);
    return Promise.reject('error in test1');
  });
}

function asyncTest2() {
  return new Promise((resolve, reject) => {
    reject('error in test2');
  }).then(value => {
    console.log('val is test2', value);
  });
}

asyncTest1().then(() => asyncTest2()).then(() => console.log('All promises resolved'));
