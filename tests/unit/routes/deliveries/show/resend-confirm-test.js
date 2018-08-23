import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('route:deliveries/show/resend-confirm', 'Unit | Route | deliveries/show/resend confirm', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});

test('it calls generatePreview on the controller', function(assert) {
  assert.expect(1);
  let route = this.subject();
  let mockController = Ember.Object.create({
    generatePreview() {
      assert.ok(true);
    }
  });
  route.setupController(mockController);
});
