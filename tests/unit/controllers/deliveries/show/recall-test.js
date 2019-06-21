import { run } from '@ember/runloop';
import { resolve } from 'rsvp';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | deliveries/show/recall', function(hooks) {
  setupTest(hooks);

  test('it navigates to deliveries.show for back action', function(assert) {
    let controller = this.owner.factoryFor('controller:deliveries/show/recall').create({
      transitionToRoute(routeName) {
        assert.equal(routeName, 'deliveries.show', 'back action should transition to show delivery');
      }
    });
    controller.send('back');
  });

  test('it cancels delivery and navigates to deliveries.show for recallDelivery action', function(assert) {
    let controller = this.owner.factoryFor('controller:deliveries/show/recall').create({
      get: function (key) {
        if (key === 'model.delivery') {
          return resolve({
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
    run(() => {
      controller.send('recallDelivery');
    });
    assert.verifySteps([
      'Canceled delivery',
      'transitionToRoute deliveries.show'
    ]);
  });
});
