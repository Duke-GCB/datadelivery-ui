import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('controller:deliveries/show/index', 'Unit | Controller | deliveries/show/index', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('it computes showResend true', function(assert) {
  let controller = this.subject({
    model: Ember.Object.create({
      canResend: true
    })
  });
  assert.equal(controller.get('showResend'), true);
});

test('it computes showResend false', function(assert) {
  let controller = this.subject({
    model: Ember.Object.create({
      canResend: false
    })
  });
  assert.equal(controller.get('showResend'), false);
});
