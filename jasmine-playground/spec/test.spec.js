
describe('A suite', () => {
  it('contains spec with an expectation ', function () {
    expect(true).toBe(true);
  });
});

describe('A spy', () => {
  var foo, bar = null;
  beforeEach(function (){
    foo = {
      setBar: (val) => bar = val
    }
    spyOn(foo, 'setBar');
    foo.setBar(23);
    foo.setBar(456, 'another param')
  });


  it('tracks that the spy was called', function () {
    expect(foo.setBar).toHaveBeenCalled();
  });
});

describe('A spy, when created manually', () => {
  var whatAmI;

  beforeEach(function () {
    whatAmI = jasmine.createSpy('whatAmI');
    whatAmI('I', 'am', 'a', 'spy');
  });

  it('tracks that the spy was called', function () {
    expect(whatAmI).toHaveBeenCalled();
  });
});

describe('A spy object', () => {
  it('should property when calling property', function () {
    let testSpy = jasmine.createSpyObj([], ['name']);
    Object.getOwnPropertyDescriptor(testSpy, 'name').get.and.returnValue('Joe');
    expect(testSpy.name).toBe('Joe');
  });
});
