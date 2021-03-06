import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

const MockObjects = EmberObject.create({
  init() {
    const sender = EmberObject.create({id:'sender-id'});
    const recipient = EmberObject.create({id:'recipient-id'});
    const pending = EmberObject.create({
      status: 'pending',
      fromUser: sender,
      toUsers: [recipient]
    });
    const accepted = EmberObject.create({
      status: 'accepted',
      fromUser: sender,
      toUsers: [recipient]
    });
    const declined = EmberObject.create({
      status: 'declined',
      fromUser: sender,
      toUsers: [recipient]
    });
    const canceled = EmberObject.create({
      status: 'canceled',
      fromUser: sender,
      toUsers: [recipient]
    });
    this.set('sender', sender);
    this.set('recipient', recipient);
    this.set('pending', pending);
    this.set('accepted', accepted);
    this.set('declined', declined);
    this.set('canceled', canceled);
  }
});

const Statuses = ['pending','accepted','declined','canceled'];

module('Unit | Controller | deliveries/show/index', function(hooks) {
  setupTest(hooks);

  test('it is ok', function(assert) {
    let controller = this.owner.factoryFor('controller:deliveries/show/index').create({});
    assert.ok(controller);
  });

  test('mock objects were created correctly', function(assert) {
    assert.equal(MockObjects.get('sender.id'), 'sender-id');
    assert.equal(MockObjects.get('recipient.id'), 'recipient-id');
    Statuses.forEach((s) => {
      assert.equal(s, MockObjects.get(`${s}.status`));
    });
  });

  test('it computes showProjectDetails as true always for sender', function(assert) {
    assert.expect(Statuses.length);
    Statuses.forEach((s) => {
      const controller = this.owner.factoryFor('controller:deliveries/show/index').create({
        model: MockObjects.get(s),
        currentDukeDsUser: MockObjects.get('sender')
      });
      assert.ok(controller.get('showProjectDetails'));
    });
  });

  test('it computes showProjectDetails as true for accepted recipient', function(assert) {
    assert.expect(1);
    const controller = this.owner.factoryFor('controller:deliveries/show/index').create({
      model: MockObjects.get('accepted'),
      currentDukeDsUser: MockObjects.get('recipient')
    });
    assert.ok(controller.get('showProjectDetails'));
  });

  test('it computes showProjectDetails as false when current user cannot be determined', function(assert) {
    assert.expect(Statuses.length);
    Statuses.forEach((s) => {
      const controller = this.owner.factoryFor('controller:deliveries/show/index').create({
        model: MockObjects.get(s),
        currentDukeDsUser: null,
      });
      assert.notOk(controller.get('showProjectDetails'));
    });
  });

  test('it computes showProjectDetails as false for pending/canceled/declined recipient', function (assert) {
    assert.expect(3);
    Statuses.forEach((s) => {
      const controller = this.owner.factoryFor('controller:deliveries/show/index').create({
        model: MockObjects.get(s),
        currentDukeDsUser: MockObjects.get('recipient'),
      });
      if (s !== 'accepted') {
        assert.notOk(controller.get('showProjectDetails'));
      }
    });
  });
});
