import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('controller:deliveries/show/can-resend-controller', 'Unit | Controller | deliveries/show/can resend controller', {
  // Specify the other units that are required for this test.
  needs: ['service:session', 'service:user', 'model:user']
});


test('it fetches currentUser when session.isAuthenticated changes', function(assert) {
  assert.expect(4);
  const mockSessionService = Ember.Object.create({
    isAuthenticated: false
  });
  const mockUser = Ember.Object.create({ id: 6, username: 'samus'});
  const mockUserService = Ember.Object.create({
    currentUser() {
      assert.ok(true); // Ensure this is called
      return Ember.RSVP.resolve(mockUser);
    }
  });
  let controller = this.subject({
    session: mockSessionService,
    user: mockUserService
  });

  // In one run loop, set isAuthenticated = true
  Ember.run(() => {
    assert.equal(controller.get('currentUser'), null); // currentUser should be null when session is not authenticated
    mockSessionService.set('isAuthenticated', true);
  });

  // In the next, assert that the current User updated. Then clear authentication
  Ember.run(() => {
    assert.equal(controller.get('currentUser'), mockUser); // currentUser should be fetched when session is authenticated
    mockSessionService.set('isAuthenticated', false);
  });

  // Finally, assert that currentUser is null again
  Ember.run(() => {
    assert.equal(controller.get('currentUser'), null); // currentUser should be null when session is not authenticated
  });
});

test('canResend is false when no currentUser', function(assert) {
  let controller = this.subject({
    currentUser: null
  });
  assert.equal(controller.get('canResend'), false);
});

test('canResend is true when model.canResend and currentUser is fromUser', function(assert) {
  let controller = this.subject({
    model: Ember.Object.create({
      canResend: true,
      fromUser: Ember.Object.create({
        id: '123'
      })
    }),
  });
  Ember.run(() => {
    controller.set('currentUser', Ember.Object.create({
      dukeDsUser: Ember.Object.create({
        id: '123'
      })
    }));
  });
  Ember.run(() => {
    assert.equal(controller.get('canResend'), true);
  });
});

test('canResend is false when not model.canResend and currentUser is fromUser', function(assert) {
  let controller = this.subject({
    model: Ember.Object.create({
      canResend: false,
      fromUser: Ember.Object.create({
        id: '123'
      })
    }),
  });
  Ember.run(() => {
    controller.set('currentUser', Ember.Object.create({
      dukeDsUser: Ember.Object.create({
        id: '123'
      })
    }));
  });
  Ember.run(() => {
    assert.equal(controller.get('canResend'), false);
  });
});

test('canResend is false when model.canResend and currentUser is not fromUser', function(assert) {
  let controller = this.subject({
    model: Ember.Object.create({
      canResend: false,
      fromUser: Ember.Object.create({
        id: '123'
      })
    }),
  });
  Ember.run(() => {
    controller.set('currentUser', Ember.Object.create({
      dukeDsUser: Ember.Object.create({
        id: '124'
      })
    }));
  });
  Ember.run(() => {
    assert.equal(controller.get('canResend'), false);
  });
});
