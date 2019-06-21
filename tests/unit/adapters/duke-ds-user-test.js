import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Adapter | duke ds user', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let adapter = this.owner.lookup('adapter:duke-ds-user');
    assert.ok(adapter);
  });

  test('it returns current-duke-ds-user url for queryRecord', function(assert) {
    let adapter = this.owner.lookup('adapter:duke-ds-user');
    let url = adapter.urlForQueryRecord({}, 'duke-ds-user');
    assert.equal(url, 'http://testhost/duke-ds-users/current-duke-ds-user/')
  });
});
