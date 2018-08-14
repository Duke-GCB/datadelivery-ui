import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('route:deliveries/new/select-recipient', 'Unit | Route | deliveries/new/select recipient', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});

test('it sets model to all duke-ds-users', function(assert) {
  let route = this.subject({
    store: {
      findAll(recordModel) {
        assert.equal(recordModel, 'duke-ds-user');
        return [Ember.Object.create({id: 456})];
      }
    }
  });
  let model = route.model();
  assert.equal(model.length, 1);
  assert.equal(model[0].get('id'), 456);
});
