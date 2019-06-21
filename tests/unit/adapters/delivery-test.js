import { resolve } from 'rsvp';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Adapter | delivery', function(hooks) {
  setupTest(hooks);

  test('it POSTS the send action without force', function(assert) {
    let adapter = this.owner.lookup('adapter:delivery');
    assert.ok(adapter);
    adapter.set('ajax', (url, method) => {
      assert.equal(url, 'http://testhost/deliveries/1/send/');
      assert.equal(method, 'POST');
    });
    adapter.send(1, false);
  });

  test('it POSTS the send action with force', function(assert) {
    let adapter = this.owner.lookup('adapter:delivery');
    adapter.set('ajax', (url, method) => {
      assert.equal(url, 'http://testhost/deliveries/2/send/?force=true');
      assert.equal(method, 'POST');
    });
    adapter.send(2, true);
  });

  test('Calling preview POSTs to the delivery-previews endpoint', function(assert) {
    let adapter = this.owner.lookup('adapter:delivery');
    adapter.set('ajax', (url, method) => {
      assert.equal(url, 'http://testhost/delivery-previews/');
      assert.equal(method, 'POST');
      return resolve({});
    });
    adapter.preview();
  });

  test('Calling preview(details) wraps the details in a delivery-preview object', function(assert) {
    let adapter = this.owner.lookup('adapter:delivery');
    const payload = {some_key: 'some_value'};
    adapter.set('ajax', (url, method, options) => {
      assert.equal(url, 'http://testhost/delivery-previews/');
      assert.equal(method, 'POST');
      assert.deepEqual(options.data, {'delivery-preview': payload });
      return resolve({});
    });
    adapter.preview(payload);
  });

  test('Calling cancel() POSTs to delivery /cancel route', function(assert) {
    let adapter = this.owner.lookup('adapter:delivery');
    adapter.set('ajax', (url, method) => {
      assert.equal(url, 'http://testhost/deliveries/cancel/');
      assert.equal(method, 'POST');
      return resolve({});
    });
    adapter.cancel();
  });
});
