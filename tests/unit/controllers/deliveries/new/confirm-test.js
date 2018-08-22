import { moduleFor, test } from 'ember-qunit';
import Ember from "ember";

moduleFor('controller:deliveries/new/confirm', 'Unit | Controller | deliveries/new/confirm', {
  needs: ['controller:application', 'service:duke-ds-user', 'service:session']
});

test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});

test('it handles saveAndSend action', function(assert) {
  assert.expect(7);
  const project = Ember.Object.create({ id: '123' });
  const fromUser = Ember.Object.create({ id: '222' });
  const toUser = Ember.Object.create({ id: '456' });
  const controller = this.subject({
    generatePreview() {
      // stub to avoid side effects
    },
    projectId: '123',
    toUserId: '456',
    userMessage: 'hey bob',
    currentDukeDsUser: fromUser,
    store: {
      findRecord(modelName, id) {
        return Ember.RSVP.resolve(Ember.Object.create({id: id}));
      },
      createRecord(modelName, payload) {
        assert.equal(modelName, 'delivery');
        assert.deepEqual(payload.project, project);
        assert.deepEqual(payload.fromUser, fromUser);
        assert.deepEqual(payload.toUser, toUser);
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

test('it disables next and clears errors on saveAndSend action', function (assert) {
  assert.expect(5);
  const mockDelivery = Ember.Object.create({
    save() {
      return Ember.RSVP.resolve(this);
    },
    send() {
      return Ember.RSVP.resolve(this);

    }
  });
  const controller = this.subject({
    errors: ['failure'],
    generatePreview() {
      // stub to avoid side effects
    },
    store: {
      findRecord() { return Ember.RSVP.resolve(Ember.Object.create({})); },
      createRecord() { return mockDelivery; }
    },
    transitionToRoute(routeName) {
      assert.equal(routeName, 'deliveries.show');
    }
  });
  assert.notOk(controller.get('disableNext'), 'disableNext should initially be false');
  assert.equal(controller.get('errors.length'), 1, 'Errors should initially have one element');
  controller.send('saveAndSend');
  assert.ok(controller.get('disableNext'), 'disableNext should be true');
  assert.notOk(controller.get('errors.length'), 'errors should be cleared');
});

test('it handles back action', function(assert) {
  assert.expect(3);
  const controller = this.subject({
    projectId: '123',
    toUserId: '456',
    transitionToRoute(routeName, data) {
      assert.equal(routeName, 'deliveries.new.enter-user-message');
      assert.equal(data.queryParams.projectId, '123');
      assert.equal(data.queryParams.toUserId, '456');
    }
  });
  controller.send('back');
});

test('it generates a preview when all required properties set', function(assert) {
  const projectId = '123';
  const fromUser = Ember.Object.create({id: '222'});
  const toUserId = '456';
  const userMessage = 'thanks';
  const mockDelivery = Ember.Object.create({
    preview(details) {
      assert.deepEqual(details, {
        project_id: projectId,
        from_user_id: fromUser.get('id'),
        to_user_id: toUserId,
        user_message: userMessage,
        transfer_id: '',
      });
      return Ember.RSVP.resolve({delivery_email_text: `Subject: ${details.user_message}`});
    }
  });
  const controller = this.subject({
    fromUser: fromUser,
    store: {
      createRecord(modelName) {
        assert.equal(modelName, 'delivery');
        return mockDelivery;
      }
    }
  });
  Ember.run(() => {
    assert.notOk(controller.get('emailMessage'));
    controller.set('projectId', projectId);
    assert.notOk(controller.get('emailMessage'));
    controller.set('toUserId', toUserId);
    assert.notOk(controller.get('emailMessage'));
    controller.set('userMessage', userMessage);
  });
  assert.equal(controller.get('emailMessage'), 'Subject: thanks');
});
