import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:deliveries/show/index', 'Unit | Controller | deliveries/show/index', {
  // Specify the other units that are required for this test.
  needs: ['service:session', 'service:user', 'model:user']
});

test('it is ok', function(assert) {
  let controller = this.subject({});
  assert.ok(controller);
});
