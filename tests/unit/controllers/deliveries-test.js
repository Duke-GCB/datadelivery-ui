import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:deliveries', 'Unit | Controller | deliveries', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
  needs: ['controller:application', 'service:session', 'service:duke-ds-user']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});
