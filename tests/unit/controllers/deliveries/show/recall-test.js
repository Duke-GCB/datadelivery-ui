import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('controller:deliveries/show/recall', 'Unit | Controller | deliveries/show/recall', {
});

test('it navigates to deliveries.show for back action', function(assert) {
  let controller = this.subject({
    transitionToRoute(routeName) {
      assert.equal(routeName, 'deliveries.show', 'back action should transition to show delivery');
    }
  });
  controller.send('back');
});

test('it cancels delivery and navigates to deliveries.show for recallDelivery action', function(assert) {
  assert.expect(2);
  let controller = this.subject({
    get: function () {
      return Ember.RSVP.resolve({
        cancel: function () {
          assert.ok(true);
        }
      });
    },
    transitionToRoute(routeName) {
      assert.equal(routeName, 'deliveries.show', 'back action should transition to show delivery');
    }
  });
  controller.send('recallDelivery');
});
