import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | deliveries/new/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:deliveries/new/index');
    assert.ok(route);
  });

  test('it transitions to project selection', function(assert) {
    let route = this.owner.factoryFor('route:deliveries/new/index').create({
      transitionTo(routeName) {
        assert.equal('deliveries.new.select-project', routeName);
      }
    });
    route.beforeModel();
  });
});
