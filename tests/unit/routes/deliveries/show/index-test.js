import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | deliveries/show/index', function(hooks) {
  setupTest(hooks);

  test('it resets infoMessage when exiting', function(assert) {
    let route = this.owner.factoryFor('route:deliveries/show/index').create({});
    let controller = EmberObject.create({
      infoMessage: 'Warning'
    });
    route.resetController(controller, false);
    assert.equal(controller.infoMessage, 'Warning');
    route.resetController(controller, true);
    assert.equal(controller.infoMessage, null);
  });
});
