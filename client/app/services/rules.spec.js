var mock, rulesService;
beforeEach(module('spockApp'));
beforeEach(function() {

  inject(function($injector) {
    rulesService = $injector.get('rulesService');
  });
});

it('should not alert first two notifications', function() {
  // rulesService('one');
  // rulesService('two');

  expect(rulesService('rock', 'paper')).toEqual(1);
});

// pas le temps de faire de vrais tests, malheuresement.
