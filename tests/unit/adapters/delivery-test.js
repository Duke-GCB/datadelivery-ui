import { moduleFor, test } from 'ember-qunit';

moduleFor('adapter:delivery', 'Unit | Adapter | delivery', {
  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']
  needs: ['service:session']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let adapter = this.subject();
  assert.ok(adapter);
});

test('it POSTS the send action without force', function(assert) {
  let adapter = this.subject();
  adapter.set('ajax', (url, method) => {
    assert.equal(url, 'http://testhost/deliveries/1/send/');
    assert.equal(method, 'POST');
  });
  adapter.send(1, false);
});

test('it POSTS the send action with force', function(assert) {
  let adapter = this.subject();
  adapter.set('ajax', (url, method) => {
    assert.equal(url, 'http://testhost/deliveries/2/send/?force=true');
    assert.equal(method, 'POST');
  });
  adapter.send(2, true);
});
