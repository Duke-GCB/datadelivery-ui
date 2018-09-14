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
  let controller = this.subject({
    get: function (key) {
      if (key === 'model.delivery') {
        return Ember.RSVP.resolve({
          cancel: function () {
            assert.step(`Canceled delivery`);
          }
        });
      }
      if (key === 'model.project.name') {
        return 'MyProject'
      }
    },
    transitionToRoute(routeName, routeModel, params) {
      assert.step(`transitionToRoute ${routeName}`);
      assert.equal(routeName, 'deliveries.show', 'recallDelivery action should transition to show delivery');
      assert.equal(params.queryParams.infoMessage, 'Canceled delivery of project MyProject.');
    }
  });
  Ember.run(() => {
    controller.send('recallDelivery');
  });
  assert.verifySteps([
    'Canceled delivery',
    'transitionToRoute deliveries.show'
  ]);
});
