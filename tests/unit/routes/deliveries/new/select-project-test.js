import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | deliveries/new/select project', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:deliveries/new/select-project');
    assert.ok(route);
  });

  test('it sets model to non-deleted projects', function(assert) {
    assert.expect(4);
    let route = this.owner.factoryFor('route:deliveries/new/select-project').create({
      store: {
        query(recordModel, params) {
          assert.equal(recordModel, 'duke-ds-project');
          assert.equal(params.is_deleted, false);
          return [EmberObject.create({id: 123})];
        }
      }
    });
    let model = route.model();
    assert.equal(model.length, 1);
    assert.equal(model[0].get('id'), 123);
  });
});
