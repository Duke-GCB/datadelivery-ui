import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | deliveries/show/can resend controller', function(hooks) {
  setupTest(hooks);

  test('canResend is false when no currentDukeDsUser', function(assert) {
    let controller = this.owner.factoryFor('controller:deliveries/show/can-resend-controller').create({
      currentDukeDsUser: null
    });
    assert.equal(controller.get('canResend'), false);
  });

  test('canResend is true when model.canResend and currentDukeDsUser is fromUser', async function(assert) {
    let controller = this.owner.factoryFor('controller:deliveries/show/can-resend-controller').create({
      model: EmberObject.create({
        canResend: true,
        fromUser: EmberObject.create({
          id: '123'
        })
      }),
    });
    await controller.set('currentDukeDsUser', EmberObject.create({id: '123'}));
    assert.equal(controller.get('canResend'), true);
  });

  test('canResend is false when not model.canResend and currentDukeDsUser is fromUser', async function(assert) {
    let controller = this.owner.factoryFor('controller:deliveries/show/can-resend-controller').create({
      model: EmberObject.create({
        canResend: false,
        fromUser: EmberObject.create({id: '123'})
      }),
    });
    await controller.set('currentDukeDsUser', EmberObject.create({id: '123'}));
    assert.equal(controller.get('canResend'), false);
  });

  test('canResend is false when model.canResend and currentDukeDsUser is not fromUser', async function(assert) {
    let controller = this.owner.factoryFor('controller:deliveries/show/can-resend-controller').create({
      model: EmberObject.create({
        canResend: false,
        fromUser: EmberObject.create({id: '123'})
      }),
    });
    await controller.set('currentDukeDsUser', EmberObject.create({id: '124'}));
    assert.equal(controller.get('canResend'), false);
  });
});
