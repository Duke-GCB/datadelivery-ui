import { moduleFor, test } from 'ember-qunit';
import Ember from "ember";

moduleFor('controller:application', 'Unit | Controller | application', {
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
