import { moduleFor, test } from 'ember-qunit';

moduleFor('adapter:duke-ds-user', 'Unit | Adapter | duke ds user', {
  // Specify the other units that are required for this test.
  needs: ['service:session']
});

test('it exists', function(assert) {
  let adapter = this.subject();
  assert.ok(adapter);
});

test('it returns current-duke-ds-user url for queryRecord', function(assert) {
  let adapter = this.subject();
  let url = adapter.urlForQueryRecord({}, 'duke-ds-user');
  assert.equal(url, 'http://testhost/duke-ds-users/current-duke-ds-user/')
});
