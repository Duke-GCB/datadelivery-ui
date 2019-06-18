import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('route:duke-ds-projects/index', 'Unit | Route | duke ds projects/index', {
  needs: ['service:session']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});

test('it returns all projects in model()', function(assert) {
  let route = this.subject({
    store: {
      findAll(recordModel) {
        assert.equal(recordModel, 'duke-ds-project');
        return Ember.RSVP.resolve([
          Ember.Object.create({id:1}),
          Ember.Object.create({id:2})
        ]);
      }
    }
  });

  Ember.run(() => {
    route.model().then(model => {
      assert.equal(model.length, 2);
      assert.equal(model.objectAt(0).get('id'), 1);
      assert.equal(model.objectAt(1).get('id'), 2);
    });
  });
});
