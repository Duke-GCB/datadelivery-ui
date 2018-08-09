import { moduleFor, test } from 'ember-qunit';
import Ember from "ember";

moduleFor('controller:deliveries/new/select-recipient', 'Unit | Controller | deliveries/new/select recipient', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
  needs: ['controller:application', 'service:session', 'service:duke-ds-user']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});

test('it handles back action', function(assert) {
  assert.expect(1);
  let controller = this.subject({
    transitionToRoute(routeName) {
      assert.equal(routeName, 'deliveries.new.select-project', 'back action should transition to select-project');
    }
  });
  controller.send('back');
});

test('it handles next action', function(assert) {
  let toUser = Ember.Object.create({ id: '456' });
  let controller = this.subject({
    projectId: '123',
    toUser: toUser,
    transitionToRoute(routeName, data) {
      assert.equal(routeName, 'deliveries.new.enter-user-message', 'next action should transition to enter-user-message');
      assert.equal(data.queryParams.projectId, '123', 'next action should pass projectId');
      assert.equal(data.queryParams.toUserId, '456', 'next action should pass toUserId');
    }
  });
  controller.send('next');
});

test('it looks up project based on query param', function(assert) {
  let controller = this.subject({
    projectId: '123',
    store: {
      findRecord(modelName, modelKey) {
        assert.equal(modelName, 'duke-ds-project');
        assert.equal(modelKey, '123');
        return 'someproject';
      }
    }
  });
  assert.equal(controller.get('project'), 'someproject');
});

test('it computes a list of users outside of the currentDukeDSUser', function(assert) {
  let currentDukeDsUser = Ember.Object.create({ id: '123', fullName: 'Jane Smith' });
  let userList = [
    currentDukeDsUser,
    Ember.Object.create({ id: '456', fullName: 'John Smith' })
  ];
  let controller = this.subject({
    application: {
      currentDukeDsUser: currentDukeDsUser
    },
    model: userList,
  });
  assert.equal(controller.get('model').length, 2);
  assert.equal(controller.get('otherUsersList').length, 1);
  assert.equal(controller.get('otherUsersList')[0].get('id'), '456');
});

test('it computes a list of users filtering out those with null fullNames', function(assert) {
  const goodUser = Ember.Object.create({ id: '123', fullName: 'John Smith' });
  const badUser1 = Ember.Object.create({ id: '456'});
  badUser1.set('fullName', null);
  const badUser2 = Ember.Object.create({ id: '789', fullName: '(null)'});
  let controller = this.subject({
    model: [goodUser, badUser1, badUser2],
  });
  assert.equal(controller.get('model').length, 3, 'There should be three users in the model');
  assert.equal(controller.get('otherUsersList').length, 1, 'Only one has a valid fullName');
  assert.equal(controller.get('otherUsersList')[0].get('id'), '123', 'Good user should be in the list');
});

test('it handles toUserSelectionChanged', function(assert) {
  let toUser = Ember.Object.create({ id: '123' });
  let controller = this.subject({
    toUser: null,
  });
  controller.send('toUserSelectionChanged', {
    selectedItems: [
      toUser
    ]
  });
  assert.equal(controller.get('toUser'), toUser);
});
