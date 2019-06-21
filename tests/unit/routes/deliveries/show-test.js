import { run } from '@ember/runloop';
import EmberObject from '@ember/object';
import { resolve } from 'rsvp';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | deliveries/show', function(hooks) {
  setupTest(hooks);

  test('it finds a delivery based on delivery_id', function(assert) {
    let route = this.owner.factoryFor('route:deliveries/show').create({
      store: {
        findRecord(recordModel, id) {
          return resolve(EmberObject.create({id: id, kind: 'find_' + recordModel}));
        }
      }
    });

    run(() => {
      route.model({transfer_id: 1}).then(model => {
        assert.equal(model.get('kind'), 'find_duke-ds-project-transfer');
        assert.equal(model.get('id'), 1);
      });
    });
  });
});
