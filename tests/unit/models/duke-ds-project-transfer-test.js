import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Model | duke ds project transfer', function(hooks) {
  setupTest(hooks);

  test('it exists', async function(assert) {
    let model = await this.owner.lookup('service:store').createRecord('duke-ds-project-transfer');
    assert.ok(!!model);
  });

  test('it generates toUsersNames for one user', async function(assert) {
    const user1 = await this.owner.lookup('service:store').createRecord('duke-ds-user', {
      fullName: 'Joe Smith'
    });
    const model = await this.owner.lookup('service:store').createRecord('duke-ds-project-transfer', {
      toUsers: [user1]
    });
    assert.equal(model.get('toUsersNames'), 'Joe Smith')
  });

  test('it generates toUsersNames for two names', async function(assert) {
    const user1 = await this.owner.lookup('service:store').createRecord('duke-ds-user', {
      fullName: 'Joe Smith'
    });
    const user2 = await this.owner.lookup('service:store').createRecord('duke-ds-user', {
      fullName: 'Jane Doe'
    });
    const model = await this.owner.lookup('service:store').createRecord('duke-ds-project-transfer', {
      toUsers: [user1, user2]
    });
    assert.equal(model.get('toUsersNames'), 'Joe Smith, Jane Doe')
  });

  test('canResend is true when status is pending', async function(assert) {
    const model = await this.owner.lookup('service:store').createRecord('duke-ds-project-transfer', {
      status: 'pending'
    });
    assert.equal(model.get('canResend'), true)
  });

  test('canResend is false when status is canceled', async function(assert) {
    const model = await this.owner.lookup('service:store').createRecord('duke-ds-project-transfer', {
      status: 'canceled'
    });
    assert.equal(model.get('canResend'), false)
  });
});
