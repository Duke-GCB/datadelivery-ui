import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Model | email template', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('email-template', {});
    assert.ok(model);
  });

  test('it computes content from subject and body', function(assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('email-template', {
      body: 'mybody',
      subject: 'subject',
    });
    assert.equal(model.get('content').trim(), 'Subject: subject\n\nmybody');
  });

  test('it computes userType from type', function(assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('email-template', {
      type: 'one_two_three',
      body: 'mybody',
      subject: 'subject',
    });
    assert.equal(model.get('userType').trim(), 'One Two Three');
  });
});
