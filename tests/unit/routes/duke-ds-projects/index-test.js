import EmberObject from '@ember/object';
import { resolve } from 'rsvp';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | duke ds projects/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:duke-ds-projects/index');
    assert.ok(route);
  });

  test('it returns all projects in model()', async function(assert) {
    let route = this.owner.factoryFor('route:duke-ds-projects/index').create({
      store: {
        findAll(recordModel) {
          assert.equal(recordModel, 'duke-ds-project');
          return resolve([
            EmberObject.create({id:1}),
            EmberObject.create({id:2})
          ]);
        }
      }
    });

    const model = await route.model();
    assert.equal(model.length, 2);
    assert.equal(model.objectAt(0).get('id'), 1);
    assert.equal(model.objectAt(1).get('id'), 2);
  });
});
