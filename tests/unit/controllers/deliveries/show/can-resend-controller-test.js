import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('controller:deliveries/show/can-resend-controller', 'Unit | Controller | deliveries/show/can resend controller', {
  // Specify the other units that are required for this test.
  needs: ['service:session', 'service:duke-ds-user', 'model:duke-ds-user']
});


test('it fetches currentDukeDsUser when session.isAuthenticated changes', function(assert) {
  assert.expect(4);
  const mockSessionService = Ember.Object.create({
    isAuthenticated: false
  });
  const mockDukeDsUser = Ember.Object.create({ id: 6, username: 'samus'});
  const mockDukeDSUserService = Ember.Object.create({
    currentDukeDsUser() {
      assert.ok(true); // Ensure this is called
      return Ember.RSVP.resolve(mockDukeDsUser);
    }
  });
  let controller = this.subject({
    session: mockSessionService,
    dukeDsUser: mockDukeDSUserService
  });

  // In one run loop, set isAuthenticated = true
  Ember.run(() => {
    assert.equal(controller.get('currentDukeDsUser'), null); // currentDukeDsUser should be null when session is not authenticated
    mockSessionService.set('isAuthenticated', true);
  });

  // In the next, assert that the current User updated. Then clear authentication
  Ember.run(() => {
    assert.equal(controller.get('currentDukeDsUser'), mockDukeDsUser); // currentDukeDsUser should be fetched when session is authenticated
    mockSessionService.set('isAuthenticated', false);
  });

  // Finally, assert that currentDukeDsUser is null again
  Ember.run(() => {
    assert.equal(controller.get('currentDukeDsUser'), null); // currentDukeDsUser should be null when session is not authenticated
  });
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
