let p = new Promise((resolve, reject) => {
  setTimeout(() => resolve('Hello friend!'), 1000);
});
async function hello() {
  const message = await p;
  console.log('message from p', message);
  return message;
}

hello().then(m => console.log(m));
