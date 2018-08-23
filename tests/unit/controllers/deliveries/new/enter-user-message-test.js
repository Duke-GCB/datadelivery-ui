import { moduleFor, test } from 'ember-qunit';
import Ember from "ember";

moduleFor('controller:deliveries/new/enter-user-message', 'Unit | Controller | deliveries/new/enter user message', {
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

test('it handles next action', function(assert) {
  assert.expect(4);
  let controller = this.subject({
    projectId: '123',
    toUserId: 'abc',
    userMessage: 'Hello World',
    transitionToRoute(routeName, data) {
      assert.equal(routeName, 'deliveries.new.confirm', 'next action should transition to confirm');
      assert.equal(data.queryParams.projectId, '123', 'projectId in query params');
      assert.equal(data.queryParams.toUserId, 'abc', 'toUserId in query params');
      assert.equal(data.queryParams.userMessage, 'Hello World', 'userMessage in query params');
    }
  });
  controller.send('next');
});
