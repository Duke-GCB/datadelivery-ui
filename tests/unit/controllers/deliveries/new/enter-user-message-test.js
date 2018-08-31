import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:deliveries/new/enter-user-message', 'Unit | Controller | deliveries/new/enter user message', {
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});

test('it sets expected routes', function(assert) {
  let controller = this.subject({});
  assert.equal(controller.get('backRoute'), 'deliveries.new.select-recipient');
  assert.equal(controller.get('nextRoute'), 'deliveries.new.confirm');
});
