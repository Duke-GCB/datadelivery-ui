import { moduleFor, test } from 'ember-qunit';

moduleFor('adapter:duke-ds-auth-provider-affiliate', 'Unit | Adapter | duke ds auth provider affiliate', {
  needs: ['service:session']
});

test('it POSTs the getOrRegisterUser action to the correct URL', function (assert) {
  let adapter = this.subject();
  assert.ok(adapter);
  adapter.set('ajax', (url, method) => {
    assert.equal(url, 'http://testhost/duke-ds-auth-provider-affiliates/abc123/get-or-register-user/');
    assert.equal(method, 'POST');
  });
  adapter.getOrRegisterUser('abc123');
});
