import { moduleFor, test } from 'ember-qunit';
import Ember from "ember";

moduleFor('controller:deliveries/new/enter-user-message', 'Unit | Controller | deliveries/new/enter user message', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
  needs: ['controller:application', 'service:duke-ds-user', 'service:session']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});

test('it handles back action', function(assert) {
  assert.expect(2);
  let controller = this.subject({
    projectId: '123',
    transitionToRoute(routeName, data) {
      assert.equal(routeName, 'deliveries.new.select-recipient', 'back action should transition to select-project');
      assert.equal(data.queryParams.projectId, '123', 'include project in select-project query params');
    }
  });
  controller.send('back');
});

test('it looks up project based on query param', function(assert) {
  let controller = this.subject({
    projectId: '123',
    store: {
      findRecord(modelName, modelKey) {
        if (modelName === 'duke-ds-project') {
          assert.equal(modelKey, '123');
          return 'someproject';
        }
        return null;
      }
    }
  });
  assert.equal(controller.get('project'), 'someproject');
});

test('it looks up toUser based on query param', function(assert) {
  let controller = this.subject({
    toUserId: '456',
    store: {
      findRecord(modelName, modelKey) {
        if (modelName === 'duke-ds-user') {
          assert.equal(modelKey, '456');
          return 'someuser';
        }
        return null;
      }
    }
  });
  assert.equal(controller.get('toUser'), 'someuser');
});

test('it looks up shareUsers based on query param', function(assert) {
  let controller = this.subject({
    toUserId: '456',
    shareUserIds: '789',
    store: {
      findRecord(modelName, modelKey) {
        if (modelName === 'duke-ds-user' && modelKey === '789') {
          return 'someuser';
        }
        return null;
      }
    }
  });
  assert.equal(controller.get('shareUsers').length, 1);
  assert.equal(controller.get('shareUsers')[0], 'someuser');
});

test('it handles saveAndSend action', function(assert) {
  assert.expect(10);
  const project = Ember.Object.create({ id: '123' });
  const fromUser = Ember.Object.create({ id: '222' });
  const toUser = Ember.Object.create({ id: '456' });
  const shareUser1 = Ember.Object.create({ id: '789'})
  const shareUser2 = Ember.Object.create({ id: '001'});
  const controller = this.subject({
    project: project,
    currentDukeDsUser: fromUser,
    toUser: toUser,
    shareUserIds: '789,001',
    userMessage: 'hey bob',
    store: {
      findRecord(modelName, modelKey) {
        if (modelName === 'duke-ds-user') {
          if (modelKey === shareUser1.get('id')) {
            return Ember.RSVP.resolve(shareUser1);
          } else if (modelKey === shareUser2.get('id')) {
            return Ember.RSVP.resolve(shareUser2);
          }
        }
        return null;
      },
      createRecord(modelName, payload) {
        assert.equal(modelName, 'delivery');
        assert.equal(payload.project, project);
        assert.equal(payload.fromUser, fromUser);
        assert.equal(payload.toUser, toUser);
        assert.equal(payload.shareUsers.length, 2);
        assert.equal(payload.shareUsers[0], shareUser1);
        assert.equal(payload.shareUsers[1], shareUser2);
        assert.equal(payload.userMessage, 'hey bob');
        const mockDelivery = {
          get(name) {
            if (name === 'transfer') {
              return 'sometransferid';
            }
            return null;
          }
        };
        mockDelivery.save = function () {
          return Ember.RSVP.resolve(mockDelivery);
        };
        mockDelivery.send = function () {
          return Ember.RSVP.resolve(mockDelivery);
        };
        return mockDelivery;
      }
    },
    transitionToRoute(routeName, data) {
      assert.equal(routeName, 'deliveries.show', 'next action should transition to show new delivery');
      assert.equal(data, 'sometransferid', 'next action should pass project_id');
    }
  });
  Ember.run(() => {
    controller.send('saveAndSend');
  });
});
