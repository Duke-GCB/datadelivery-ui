import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Model | duke ds project transfer', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let model = run(() => this.owner.lookup('service:store').createRecord('duke-ds-project-transfer'));
    // let store = this.store();
    assert.ok(!!model);
  });

  test('it generates toUsersNames for one user', function(assert) {
    run(() => {
      const user1 = this.owner.lookup('service:store').createRecord('duke-ds-user', {
        fullName: 'Joe Smith'
      });
      const model = run(() => this.owner.lookup('service:store').createRecord('duke-ds-project-transfer', {
        toUsers: [user1]
      }));
      assert.equal(model.get('toUsersNames'), 'Joe Smith')
    });
  });

  test('it generates toUsersNames for two names', function(assert) {
    run(() => {
      const user1 = this.owner.lookup('service:store').createRecord('duke-ds-user', {
        fullName: 'Joe Smith'
      });
      const user2 = this.owner.lookup('service:store').createRecord('duke-ds-user', {
        fullName: 'Jane Doe'
      });
      const model = run(() => this.owner.lookup('service:store').createRecord('duke-ds-project-transfer', {
        toUsers: [user1, user2]
      }));
      assert.equal(model.get('toUsersNames'), 'Joe Smith, Jane Doe')
    });
  });

  test('canResend is true when status is pending', function(assert) {
    const model = run(() => this.owner.lookup('service:store').createRecord('duke-ds-project-transfer', {
      status: 'pending'
    }));
    assert.equal(model.get('canResend'), true)
  });

  test('canResend is false when status is canceled', function(assert) {
    const model = run(() => this.owner.lookup('service:store').createRecord('duke-ds-project-transfer', {
      status: 'canceled'
    }));
    assert.equal(model.get('canResend'), false)
  });
});
