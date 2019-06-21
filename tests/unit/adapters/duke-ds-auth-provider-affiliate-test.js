import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Adapter | duke ds auth provider affiliate', function(hooks) {
  setupTest(hooks);

  test('it POSTs the getOrRegisterUser action to the correct URL', function (assert) {
    let adapter = this.owner.lookup('adapter:duke-ds-auth-provider-affiliate');
    assert.ok(adapter);
    adapter.set('ajax', (url, method) => {
      assert.equal(url, 'http://testhost/duke-ds-auth-provider-affiliates/abc123/get-or-register-user/');
      assert.equal(method, 'POST');
    });
    adapter.getOrRegisterUser('abc123');
  });
});
