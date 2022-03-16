import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { testRelationships } from '../../helpers/test-relationships';

module('Unit | Model | az-delivery', function(hooks) {
  setupTest(hooks);
  let store, deliveryAdapter;
  hooks.beforeEach(function () {
    let {owner} = this;
    store = owner.lookup('service:store');
    deliveryAdapter = store.adapterFor('az-delivery');
  });

  test('it exists', function (assert) {
    let model = store.createRecord('az-delivery');
    assert.ok(!!model);
  });

  const relationships = [
    {key: 'from_netid', kind: 'belongsTo', type: 'duke-user'},
    {key: 'to_netid', kind: 'belongsTo', type: 'duke-user'},
    {key: 'emailTemplateSet', kind: 'belongsTo', type: 'email-template-set'}
  ];
  testRelationships('az-delivery', relationships);

  test('it calculates project_name from source_project', function (assert) {
    let model = store.createRecord('az-delivery');
    model.set('source_project', {path:'user1/mouse'});
    assert.equal(model.get('project_name'), 'mouse');
  });

  test('it builds preview', function (assert) {
    assert.expect(2);
    let model = store.createRecord('az-delivery', {"id": "123"});
    const fromUser = store.push({data: {type: 'duke-user', id: "user1"}});
    const toUser = store.push({data: {type: 'duke-user', id: "user2"}});
    const emailTemplateSet = store.push({data: {type: 'email-template-set', id: "333"}});
    model.set('source_project', {path:'user1/mouse'});
    model.set('emailTemplateSet', emailTemplateSet);
    model.set('from_netid', fromUser);
    model.set('to_netid', toUser);
    model.set('simple_project_name', 'something');
    model.set('user_message', 'Here is the data');
    deliveryAdapter.preview = (details) => {
      assert.ok(true);
      return details;
    };
    const result = model.preview();
    assert.deepEqual(result, {
      "email_template_set_id": '333',
      "from_netid": "user1",
      "simple_project_name": "mouse",
      "to_netid": "user2",
      "transfer_id": "123",
      "user_message": "Here is the data"
    });
  });

  test('it calculates canResend based on status', function (assert) {
    let model = store.createRecord('az-delivery');
    model.set('status', 'notified');
    assert.equal(model.get('canResend'), true);
    model.set('status', 'accepted');
    assert.equal(model.get('canResend'), false);
  });
});
