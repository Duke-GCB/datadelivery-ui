import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('controller:deliveries/show/resend', 'Unit | Controller | deliveries/show/resend', {
  needs: ['controller:application']
});

test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});

test('it redirects to confirmation page on resend action', function(assert) {
  assert.expect(2);
  const mockModel = Ember.Object.create();
  let controller = this.subject({
    model: mockModel,
    transitionToRoute(routeName, model) {
      assert.equal(routeName, 'deliveries.show.resend-confirm');
      assert.equal(model, mockModel);
    }
  });
  controller.send('resend');
});
