import { moduleFor, test } from 'ember-qunit';

moduleFor('authorizer:drf-token-authorizer', 'Unit | Authorizer | DRF Token Authorizer', {
  unit: true,
  needs: ['service:session'],
});

test('it exists', function(assert) {
  let authenticator = this.subject();
  assert.ok(authenticator);
});
