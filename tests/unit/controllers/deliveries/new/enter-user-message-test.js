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
  assert.expect(2);
  let controller = this.subject({
    projectId: '123',
    store: {
      findRecord(modelName, modelKey) {
        if (modelName === 'duke-ds-project') {
          assert.equal(modelKey, '123');
          return Ember.RSVP.resolve('someproject');
        }
        return null;
      }
    }
  });
  controller.get('project').then(project => assert.equal(project, 'someproject'));
});

test('it looks up toUser based on query param', function(assert) {
  assert.expect(2);
  let controller = this.subject({
    toUserId: '456',
    store: {
      findRecord(modelName, modelKey) {
        if (modelName === 'duke-ds-user') {
          assert.equal(modelKey, '456');
          return Ember.RSVP.resolve('someuser');
        }
        return null;
      }
    }
  });
  controller.get('toUser').then(toUser => assert.equal(toUser, 'someuser'));
});


test('it handles saveAndSend action', function(assert) {
  assert.expect(7);
  const project = Ember.Object.create({ id: '123' });
  const fromUser = Ember.Object.create({ id: '222' });
  const toUser = Ember.Object.create({ id: '456' });
  const controller = this.subject({
    project: project,
    currentDukeDsUser: fromUser,
    toUser: toUser,
    userMessage: 'hey bob',
    store: {
      createRecord(modelName, payload) {
        assert.equal(modelName, 'delivery');
        assert.equal(payload.project, project);
        assert.equal(payload.fromUser, fromUser);
        assert.equal(payload.toUser, toUser);
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
