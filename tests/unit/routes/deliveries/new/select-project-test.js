import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('route:deliveries/new/select-project', 'Unit | Route | deliveries/new/select project', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});

test('it sets model to non-deleted projects', function(assert) {
  assert.expect(4);
  let route = this.subject({
    store: {
      query(recordModel, params) {
        assert.equal(recordModel, 'duke-ds-project');
        assert.equal(params.is_deleted, false);
        return [Ember.Object.create({id: 123})];
      }
    }
  });
  let model = route.model();
  assert.equal(model.length, 1);
  assert.equal(model[0].get('id'), 123);
});
