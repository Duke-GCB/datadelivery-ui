import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | deliveries/index', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('controller:application', EmberObject.extend({
      currentDukeDsUser: EmberObject.create({id: 23, fullName: 'Michael Jordan'}),
      currentUser: EmberObject.create({id: 24})
    }));
    this.application = this.owner.lookup('controller:application');
  });

  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:deliveries/index');
    assert.ok(controller);
  });

  test('it computes currentDukeDsUser from application', function (assert) {
    let controller = this.owner.lookup('controller:deliveries/index');
    assert.equal(controller.get('currentDukeDsUser.fullName'), 'Michael Jordan');
    assert.equal(controller.get('currentDukeDsUser.id'), 23);
  });

  test('it computes currentUser from application', function (assert) {
    let controller = this.owner.lookup('controller:deliveries/index');
    assert.equal(controller.get('currentUser.id'), 24);
  });
});
