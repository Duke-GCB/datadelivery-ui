import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('route:duke-ds-projects/show', 'Unit | Route | duke ds projects/show', {
  needs: ['service:session']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});


test('it finds a project based on project_id', function(assert) {
  let route = this.subject({
    store: {
      findRecord(recordModel, id) {
        return Ember.RSVP.resolve(Ember.Object.create({id: id, kind: 'find_' + recordModel}));
      }
    }
  });

  Ember.run(() => {
    route.model({project_id: 1}).then(model => {
      assert.equal(model.get('kind'), 'find_duke-ds-project');
      assert.equal(model.get('id'), 1);
    });
  });
});
