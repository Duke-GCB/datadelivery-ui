import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('route:deliveries/show/index', 'Unit | Route | deliveries/show/index', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('it resets infoMessage when exiting', function(assert) {
  let route = this.subject({});
  let controller = Ember.Object.create({
    infoMessage: 'Warning'
  });
  route.resetController(controller, false);
  assert.equal(controller.infoMessage, 'Warning');
  route.resetController(controller, true);
  assert.equal(controller.infoMessage, null);
});
