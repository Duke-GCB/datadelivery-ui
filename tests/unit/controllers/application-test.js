import { run } from '@ember/runloop';
import { resolve } from 'rsvp';
import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | application', function(hooks) {
  setupTest(hooks);

  test('it fetches currentDukeDsUser/currentUser when session.isAuthenticated changes', function(assert) {
    assert.expect(8);
    const mockSessionService = EmberObject.create({
      isAuthenticated: false
    });
    const mockDukeDsUser = EmberObject.create({ id: 6, username: 'samus'});
    const mockDukeDSUserService = EmberObject.create({
      currentDukeDsUser() {
        assert.ok(true); // Ensure this is called
        return resolve(mockDukeDsUser);
      }
    });
    const mockUser = EmberObject.create({ id: 7});
    const mockUserService = EmberObject.create({
      currentUser() {
        assert.ok(true); // Ensure this is called
        return resolve(mockUser);
      }
    });
    let controller = this.owner.factoryFor('controller:application').create({
      session: mockSessionService,
      dukeDsUser: mockDukeDSUserService,
      user: mockUserService
    });

    // In one run loop, set isAuthenticated = true
    run(() => {
      assert.equal(controller.get('currentDukeDsUser'), null); // currentDukeDsUser should be null when session is not authenticated
      assert.equal(controller.get('currentUser'), null); // currentUser should be null when session is not authenticated
      mockSessionService.set('isAuthenticated', true);
    });

    // In the next, assert that the current User updated. Then clear authentication
    run(() => {
      assert.equal(controller.get('currentDukeDsUser'), mockDukeDsUser); // currentDukeDsUser should be fetched when session is authenticated
      assert.equal(controller.get('currentUser'), mockUser); // currentUser should be fetched when session is authenticated
      mockSessionService.set('isAuthenticated', false);
    });

    // Finally, assert that currentDukeDsUser is null again
    run(() => {
      assert.equal(controller.get('currentDukeDsUser'), null); // currentDukeDsUser should be null when session is not authenticated
      assert.equal(controller.get('currentUser'), null); // currentUser should be null when session is not authenticated
    });
  });
});
