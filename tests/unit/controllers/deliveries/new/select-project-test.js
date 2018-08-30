import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('controller:deliveries/new/select-project', 'Unit | Controller | deliveries/new/select project', {
});

test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});

test('it sets expected routes', function(assert) {
  let controller = this.subject({});
  assert.equal(controller.get('backRoute'), 'deliveries.index');
  assert.equal(controller.get('nextRoute'), 'deliveries.new.select-recipient');
});

test('it runs handleProjectChanged once when project changes', function(assert) {
  assert.expect(1);
  let controller = this.subject({
    delivery: Ember.Object.create(),
    handleProjectChanged() {
      assert.ok(true);
    }
  });
  Ember.run(() => {
    controller.set('project', 'Project');
  });
});

test('it runs handleProjectChanged once when fromUser changes', function(assert) {
  assert.expect(1);
  let controller = this.subject({
    delivery: Ember.Object.create(),
    handleProjectChanged() {
      assert.ok(true);
    }
  });
  Ember.run(() => {
    controller.set('fromUser', 'User A');
  });
});

test('it runs handleProjectChanged once when project and fromUser change in the same loop', function(assert) {
  assert.expect(1);
  let controller = this.subject({
    delivery: Ember.Object.create(),
    handleProjectChanged() {
      assert.ok(true);
    }
  });
  Ember.run(() => {
    controller.set('project', 'Project');
    controller.set('fromUser', 'User A');
  });
});

test('it runs handleProjectChanged twice when project and fromUser change in the different loops', function(assert) {
  assert.expect(2);
  let controller = this.subject({
    delivery: Ember.Object.create(),
    handleProjectChanged() {
      assert.ok(true);
    }
  });
  Ember.run(() => {
    controller.set('project', 'Project');
  });
  Ember.run(() => {
    controller.set('fromUser', 'User A');
  });
});

function makeController(subject, assert) {
  return subject({
    handleProjectChanged() {}, // Turn this off since we're calling checkProjectPermissions directly
    willPerformAction() { assert.step('willPerform'); },
    didPerformAction() { assert.step('didPerform'); },
    actionDidFail() { assert.step('didFail'); }
  })
}

test('it checks project permissions in order', function(assert) {
  const mockUserId = '123';
  const mockProject = Ember.Object.create({
    getUserProjectAuthRole(userId) {
      assert.equal(userId, mockUserId);
      assert.step('get-permissions');
      return Ember.RSVP.resolve('project_admin');
    }
  });
  const mockDelivery = Ember.Object.create({
    project: Ember.RSVP.resolve(mockProject),
    fromUser: Ember.Object.create({id: mockUserId})
  });
  let controller = makeController(this.subject, assert);
  Ember.run(() => {
    controller.set('delivery', mockDelivery);
    controller.checkProjectPermissions();
  });
  assert.verifySteps(['willPerform', 'get-permissions', 'didPerform']);
});


test('it sets error if permissions are not sufficient', function(assert) {
  const mockUserId = '123';
  const mockProject = Ember.Object.create({
    getUserProjectAuthRole(userId) {
      assert.equal(userId, mockUserId);
      assert.step('get-permissions');
      return Ember.RSVP.resolve('file_downloader');
    }
  });
  const mockDelivery = Ember.Object.create({
    project: Ember.RSVP.resolve(mockProject),
    fromUser: Ember.Object.create({id: mockUserId})
  });
  let controller = makeController(this.subject, assert);
  Ember.run(() => {
    controller.set('delivery', mockDelivery);
    controller.checkProjectPermissions();
  });
  assert.verifySteps(['willPerform', 'get-permissions', 'didFail']);
});
