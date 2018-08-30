import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:deliveries/new/base', 'Unit | Controller | deliveries/new/base', {
});

test('it requires backRoute and nextRoute property', function(assert) {
  assert.throws(() => {
    this.subject({backRoute:null, nextRoute:null});
  });
  assert.throws(() => {
    this.subject({backRoute:'back', nextRoute:null});
  });
  assert.throws(() => {
    this.subject({backRoute:null, nextRoute:'next'});
  });
  assert.ok(this.subject({backRoute:'back', nextRoute:'next'}));
});

test('it sets willPerformAction states', function(assert) {
  let controller = this.subject({backRoute:'back', nextRoute:'next'});
  controller.setProperties({
    disableNext: false,
    errors: [1,2,3]
  });
  controller.willPerformAction();
  assert.ok(controller.get('disableNext'));
  assert.equal(controller.get('errors'), null);
});

test('it sets didPerformAction states', function(assert) {
  let controller = this.subject({backRoute:'back', nextRoute:'next'});
  controller.setProperties({
    disableNext: true,
    errors: [1,2,3]
  });
  controller.didPerformAction();
  assert.notOk(controller.get('disableNext'));
  assert.equal(controller.get('errors'), null);
});

test('it sets actionDidFail states', function(assert) {
  let controller = this.subject({backRoute:'back', nextRoute:'next'});
  controller.setProperties({
    disableNext: false,
    errors: null
  });
  controller.actionDidFail({errors: 'Failed'});
  assert.ok(controller.get('disableNext'));
  assert.equal(controller.get('errors'), 'Failed');
});

test('it implements error handling/helper functionality', function(assert) {
  let controller = this.subject({backRoute:'back', nextRoute:'next'});

  controller.handleError({errors: [{detail: 'Error Detail'}]});
  assert.deepEqual(controller.get('errors'), [{detail: 'Error Detail'}]);
  assert.deepEqual(controller.get('errorMessages'), ['Error Detail']);

  controller.set('errors', [{detail: 'Error Detail'}]);
  assert.ok(controller.get('errors'));
  controller.clearError();
  assert.notOk(controller.get('errors'));

  const wrapped = controller.wrapError('Wrapped Error');
  assert.deepEqual(wrapped, {errors: [{detail:'Wrapped Error'}]});
});
