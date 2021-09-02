function init() {
  console.log(greet());
}

function greet() {
  return 'Hello World!';
}

if (require.main === module) {
  init();
}

exports.greet = greet;
