import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('controller:deliveries/show/can-resend-controller', 'Unit | Controller | deliveries/show/can resend controller', {
  // Specify the other units that are required for this test.
  needs: ['controller:application', 'service:session', 'service:duke-ds-user']
});

test('canResend is false when no currentDukeDsUser', function(assert) {
  let controller = this.subject({
    currentDukeDsUser: null
  });
  assert.equal(controller.get('canResend'), false);
});

test('canResend is true when model.canResend and currentDukeDsUser is fromUser', function(assert) {
  let controller = this.subject({
    model: Ember.Object.create({
      canResend: true,
      fromUser: Ember.Object.create({
        id: '123'
      })
    }),
  });
  Ember.run(() => {
    controller.set('currentDukeDsUser', Ember.Object.create({id: '123'}));
  });
  Ember.run(() => {
    assert.equal(controller.get('canResend'), true);
  });
});

test('canResend is false when not model.canResend and currentDukeDsUser is fromUser', function(assert) {
  let controller = this.subject({
    model: Ember.Object.create({
      canResend: false,
      fromUser: Ember.Object.create({id: '123'})
    }),
  });
  Ember.run(() => {
    controller.set('currentDukeDsUser', Ember.Object.create({id: '123'}));
  });
  Ember.run(() => {
    assert.equal(controller.get('canResend'), false);
  });
});

test('canResend is false when model.canResend and currentDukeDsUser is not fromUser', function(assert) {
  let controller = this.subject({
    model: Ember.Object.create({
      canResend: false,
      fromUser: Ember.Object.create({id: '123'})
    }),
  });
  Ember.run(() => {
    controller.set('currentDukeDsUser', Ember.Object.create({id: '124'}));
  });
  Ember.run(() => {
    assert.equal(controller.get('canResend'), false);
  });
});
