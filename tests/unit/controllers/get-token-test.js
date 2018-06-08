import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';


moduleFor('controller:get-token', 'Unit | Controller | get token', {
  needs: ['service:session'],
});

const MockSession = Ember.Object.extend({
  isAuthenticated: false,
  authenticate() {
    return new Ember.RSVP.Promise((resolve) => { resolve(); });
  }
});

test('it exists', function(assert) {
  let controller = this.subject({
    session: MockSession.create(),
    transitionToRoute() {}
  });
  assert.ok(controller);
});

test('it authenticates with jwt-session-authenticator when not authenticated', function(assert) {
  assert.expect(1);
  const session = MockSession.create({
    authenticate(authenticator) {
      assert.equal(authenticator, 'authenticator:jwt-session-authenticator')
      return new Ember.RSVP.Promise((resolve) => { resolve(); });
    },
  });
  this.subject({
    session: session,
    transitionToRoute() {}
  });
});

test('it does not call authenticate() when session is authenticated', function(assert) {
  assert.expect(1);
  const session = MockSession.create({
    isAuthenticated: true,
    authenticate() { assert.fail(); },
  });
  this.subject({
    session: session,
    transitionToRoute() { assert.ok(true); }
  });
});

test('it transitions to /login when authentication fails', function(assert) {
  assert.expect(1);
  const session = MockSession.create({
    authenticate() {
      return new Ember.RSVP.Promise((_, reject) => { reject(); });
    },
  });
  this.subject({
    session: session,
    transitionToRoute(destination) {
      assert.equal(destination, '/login');
    }
  });
});

test('it transitions to /deliveries when authentication succeeds', function(assert) {
  assert.expect(1);
  const session = MockSession.create({
    authenticate() {
      return new Ember.RSVP.Promise((resolve /*, reject */) => { resolve(); });
    },
  });
  this.subject({
    session: session,
    transitionToRoute(destination) {
      assert.equal(destination, '/deliveries');
    }
  });
});
