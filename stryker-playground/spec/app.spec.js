const {greet} = require('../app');

describe('AppTest', () => {
  it('should return greeting', function () {
    expect(greet()).toEqual('Hello World!');
  });
});
