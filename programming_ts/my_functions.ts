function test(name?) {
  console.log(`name is undefined ${name == undefined}, null ${name == null}`);
  if (name !== undefined || name !== null) {
    console.log('name', name);
  }
}
test()
