import { moduleFor, test } from 'ember-qunit';

moduleFor('route:index', 'Unit | Route | index', {
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});

test('it redirects to deliveries', function(assert) {
  let route = this.subject({
    replaceWith(routeName) {
      assert.equal(routeName, 'deliveries','replace with route name deliveries');
    }
  });
  route.beforeModel();
});
