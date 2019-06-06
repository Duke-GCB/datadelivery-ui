import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('adapter:duke-ds-project', 'Unit | Adapter | duke ds project', {
  needs: ['service:session']
});

test('it computes a promise for getUserProjectAuthRole that returns a value', function(assert) {
  assert.expect(2);
  let adapter = this.subject();
  adapter.set('ajax', (url) => {
    assert.equal(url, 'http://testhost/duke-ds-projects/123/permissions/?user=456');
    return Ember.RSVP.resolve({
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
  let adapter = this.subject();
  adapter.set('ajax', (url) => {
    assert.equal(url, 'http://testhost/duke-ds-projects/456/permissions/?user=789');
    return Ember.RSVP.resolve({
      'duke-ds-project-permissions': []
    });
  });
  const authRolePromise = adapter.getUserProjectAuthRole(456, 789);
  authRolePromise.then((value) => assert.equal(value, null));
});

test('it computes a promise for getSummary that returns a value', function(assert) {
  assert.expect(2);
  let adapter = this.subject();
  adapter.set('ajax', (url) => {
    assert.equal(url, 'http://testhost/duke-ds-projects/123/summary/');
    return Ember.RSVP.resolve({
      'duke-ds-project-summaries': {
        'total_size': 1000
      }
    });
  });
  const authRolePromise = adapter.getSummary(123);
  authRolePromise.then((summary) => assert.equal(summary.total_size, 1000));
});
