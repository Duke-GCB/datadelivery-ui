import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('controller:deliveries/index', 'Unit | Controller | deliveries/index', {
  needs: ['controller:application'],
  beforeEach() {
    this.register('controller:application', Ember.Object.extend({
      currentDukeDsUser: Ember.Object.create({id: 23, fullName: 'Michael Jordan'})
    }));
    this.inject.controller('application', {as: 'application'});
  }
});

test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});

test('it computes currentDukeDsUser from application', function (assert) {
  let controller = this.subject();
  assert.equal(controller.get('currentDukeDsUser.fullName'), 'Michael Jordan');
  assert.equal(controller.get('currentDukeDsUser.id'), 23);
});
