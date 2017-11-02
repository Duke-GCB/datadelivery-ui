import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('route:deliveries', 'Unit | Route | deliveries', {
  needs: ['service:session', 'model:delivery']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});

test('it fetches all deliveries', function(assert) {
  assert.expect(2);
  const mockDeliveries = [
    Ember.Object.create({id: 1}),
    Ember.Object.create({id: 2})
  ];
  const MockStore = Ember.Service.create({
    findAll(model) {
      assert.equal(model, 'delivery');
      return mockDeliveries;
    }
  });

  let route = this.subject({store: MockStore});
  const deliveries = route.model();
    assert.deepEqual(deliveries, mockDeliveries);
});
