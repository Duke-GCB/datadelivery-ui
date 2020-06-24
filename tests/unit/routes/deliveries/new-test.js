import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { resolve } from 'rsvp';

module('Unit | Route | deliveries/new', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:deliveries/new');
    assert.ok(route);
  });

  test('it populates default email-template-set', async function(assert) {
    assert.expect(4);
    let route = this.owner.factoryFor('route:deliveries/new').create({
      store: {
        query(recordModel, query_param) {
          assert.equal(recordModel, 'email-template-set');
          assert.deepEqual(query_param, { filter: {default: true}});
          return resolve([EmberObject.create({id:4})]);
        },
        createRecord(recordModel) {
          assert.equal(recordModel, 'delivery');
          return EmberObject.create({id:1});
        }
      }
    });
    const model = await route.model();
    assert.equal(model.get('emailTemplateSet.id'), 4);
  });
});
