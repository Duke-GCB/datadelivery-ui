import { run } from '@ember/runloop';
import EmberObject from '@ember/object';
import { resolve } from 'rsvp';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | duke ds projects/show', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:duke-ds-projects/show');
    assert.ok(route);
  });


  test('it finds a project based on project_id', function(assert) {
    let route = this.owner.factoryFor('route:duke-ds-projects/show').create({
      store: {
        findRecord(recordModel, id) {
          return resolve(EmberObject.create({id: id, kind: 'find_' + recordModel}));
        }
      }
    });

    run(() => {
      route.model({project_id: 1}).then(model => {
        assert.equal(model.get('kind'), 'find_duke-ds-project');
        assert.equal(model.get('id'), 1);
      });
    });
  });
});
