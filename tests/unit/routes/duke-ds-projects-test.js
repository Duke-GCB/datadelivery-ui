import { moduleFor, test } from 'ember-qunit';

moduleFor('route:duke-ds-projects', 'Unit | Route | duke ds projects', {
  needs: ['service:session']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
