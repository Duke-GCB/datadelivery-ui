import { moduleForModel, test } from 'ember-qunit';
import Ember from "ember";

moduleForModel('duke-ds-project-transfer', 'Unit | Model | duke ds project transfer', {
  // Specify the other units that are required for this test.
  needs: [
    'model:duke-ds-project',
    'model:duke-ds-user',
    'model:delivery'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

test('it generates toUsersNames for one user', function(assert) {
  Ember.run(() => {
    const user1 = this.store().createRecord('duke-ds-user', {
      fullName: 'Joe Smith'
    });
    const model = this.subject({
      toUsers: [user1]
    });
    assert.equal(model.get('toUsersNames'), 'Joe Smith')
  });
});

test('it generates toUsersNames for two names', function(assert) {
  Ember.run(() => {
    const user1 = this.store().createRecord('duke-ds-user', {
      fullName: 'Joe Smith'
    });
    const user2 = this.store().createRecord('duke-ds-user', {
      fullName: 'Jane Doe'
    });
    const model = this.subject({
      toUsers: [user1, user2]
    });
    assert.equal(model.get('toUsersNames'), 'Joe Smith, Jane Doe')
  });
});

test('canResend is true when status is pending', function(assert) {
  const model = this.subject({
    status: 'pending'
  });
  assert.equal(model.get('canResend'), true)
});

test('canResend is false when status is canceled', function(assert) {
  const model = this.subject({
    status: 'canceled'
  });
  assert.equal(model.get('canResend'), false)
});
