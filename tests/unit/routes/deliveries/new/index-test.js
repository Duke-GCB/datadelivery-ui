import { moduleFor, test } from 'ember-qunit';

moduleFor('route:deliveries/new/index', 'Unit | Route | deliveries/new/index', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});

test('it transitions to project selection', function(assert) {
  let route = this.subject({
    transitionTo(routeName) {
      assert.equal('deliveries.new.select-project', routeName);
    }
  });
  route.beforeModel();
});
