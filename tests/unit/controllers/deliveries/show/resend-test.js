import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | deliveries/show/resend', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:deliveries/show/resend');
    assert.ok(controller);
  });

  test('it redirects to confirmation page on resend action', function(assert) {
    assert.expect(2);
    const mockModel = EmberObject.create();
    let controller = this.owner.factoryFor('controller:deliveries/show/resend').create({
      model: mockModel,
      transitionToRoute(routeName, model) {
        assert.equal(routeName, 'deliveries.show.resend-confirm');
        assert.equal(model, mockModel);
      }
    });
    controller.send('resend');
  });
});
