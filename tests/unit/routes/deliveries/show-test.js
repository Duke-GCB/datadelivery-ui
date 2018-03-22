import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('route:deliveries/show', 'Unit | Route | deliveries/show', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('it finds a delivery based on delivery_id', function(assert) {
  let route = this.subject({
    store: {
      findRecord(recordModel, id) {
        return Ember.RSVP.resolve(Ember.Object.create({id: id, kind: 'find_' + recordModel}));
      }
    }
  });

  Ember.run(() => {
    route.model({delivery_id: 1}).then(model => {
      assert.equal(model.get('kind'), 'find_delivery');
      assert.equal(model.get('id'), 1);
    });
  });
});
