import EmberObject from '@ember/object';
import ReturnAfterLoginRouteMixinMixin from 'datadelivery-ui/mixins/return-after-login-route-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | return-after-login-route-mixin', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let ReturnAfterLoginRouteMixinObject = EmberObject.extend(ReturnAfterLoginRouteMixinMixin);
    let subject = ReturnAfterLoginRouteMixinObject.create();
    assert.ok(subject);
  });
});
