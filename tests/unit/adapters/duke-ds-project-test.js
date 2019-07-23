import { resolve } from 'rsvp';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Adapter | duke ds project', function(hooks) {
  setupTest(hooks);

  test('it computes a promise for getUserProjectAuthRole that returns a value', function(assert) {
    assert.expect(2);
    let adapter = this.owner.lookup('adapter:duke-ds-project');
    adapter.set('ajax', (url) => {
      assert.equal(url, 'http://testhost/duke-ds-projects/123/permissions/?user=456');
      return resolve({
        'duke-ds-project-permissions': [{
          auth_role: 'file_downloader'
        }]
      });
    });
    const authRolePromise = adapter.getUserProjectAuthRole(123, 456);
    authRolePromise.then((value) => assert.equal(value, 'file_downloader'));
  });

  test('it computes a promise for getUserProjectAuthRole that returns null', function(assert) {
    assert.expect(2);
    let adapter = this.owner.lookup('adapter:duke-ds-project');
    adapter.set('ajax', (url) => {
      assert.equal(url, 'http://testhost/duke-ds-projects/456/permissions/?user=789');
      return resolve({
        'duke-ds-project-permissions': []
      });
    });
    const authRolePromise = adapter.getUserProjectAuthRole(456, 789);
    authRolePromise.then((value) => assert.equal(value, null));
  });

  test('it computes a promise for getSummary that returns a value', function(assert) {
    assert.expect(2);
    let adapter = this.owner.lookup('adapter:duke-ds-project');
    adapter.set('ajax', (url) => {
      assert.equal(url, 'http://testhost/duke-ds-projects/123/summary/');
      return resolve({
        'duke-ds-project-summaries': {
          'total_size': 1000
        }
      });
    });
    const authRolePromise = adapter.getSummary(123);
    authRolePromise.then((summary) => assert.equal(summary.total_size, 1000));
  });
});
