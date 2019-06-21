import { resolve } from 'rsvp';
import { run } from '@ember/runloop';
import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | deliveries/new/select project', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:deliveries/new/select-project');
    assert.ok(controller);
  });

  test('it sets expected routes', function(assert) {
    let controller = this.owner.factoryFor('controller:deliveries/new/select-project').create({});
    assert.equal(controller.get('backRoute'), 'deliveries.index');
    assert.equal(controller.get('nextRoute'), 'deliveries.new.select-recipient');
  });

  test('it runs handleProjectChanged once when project changes', function(assert) {
    assert.expect(1);
    let controller = this.owner.factoryFor('controller:deliveries/new/select-project').create({
      delivery: EmberObject.create(),
      handleProjectChanged() {
        assert.ok(true);
      }
    });
    run(() => {
      controller.set('project', 'Project');
    });
  });

  test('it runs handleProjectChanged once when fromUser changes', function(assert) {
    assert.expect(1);
    let controller = this.owner.factoryFor('controller:deliveries/new/select-project').create({
      delivery: EmberObject.create(),
      handleProjectChanged() {
        assert.ok(true);
      }
    });
    run(() => {
      controller.set('fromUser', 'User A');
    });
  });

  test('it runs handleProjectChanged once when project and fromUser change in the same loop', function(assert) {
    assert.expect(1);
    let controller = this.owner.factoryFor('controller:deliveries/new/select-project').create({
      delivery: EmberObject.create(),
      handleProjectChanged() {
        assert.ok(true);
      }
    });
    run(() => {
      controller.set('project', 'Project');
      controller.set('fromUser', 'User A');
    });
  });

  test('it runs handleProjectChanged twice when project and fromUser change in the different loops', function(assert) {
    assert.expect(2);
    let controller = this.owner.factoryFor('controller:deliveries/new/select-project').create({
      delivery: EmberObject.create(),
      handleProjectChanged() {
        assert.ok(true);
      }
    });
    run(() => {
      controller.set('project', 'Project');
    });
    run(() => {
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
    const mockProject = EmberObject.create({
      getUserProjectAuthRole(userId) {
        assert.equal(userId, mockUserId);
        assert.step('get-permissions');
        return resolve('project_admin');
      }
    });
    const mockDelivery = EmberObject.create({
      project: resolve(mockProject),
      fromUser: EmberObject.create({id: mockUserId})
    });
    let controller = makeController(this.owner.factoryFor('controller:deliveries/new/select-project').create, assert);
    run(() => {
      controller.set('delivery', mockDelivery);
      controller.checkProjectPermissions();
    });
    assert.verifySteps(['willPerform', 'get-permissions', 'didPerform']);
  });

  test('it sets error if permissions are not sufficient', function(assert) {
    const mockUserId = '123';
    const mockProject = EmberObject.create({
      getUserProjectAuthRole(userId) {
        assert.equal(userId, mockUserId);
        assert.step('get-permissions');
        return resolve('file_downloader');
      }
    });
    const mockDelivery = EmberObject.create({
      project: resolve(mockProject),
      fromUser: EmberObject.create({id: mockUserId})
    });
    let controller = makeController(this.owner.factoryFor('controller:deliveries/new/select-project').create, assert);
    run(() => {
      controller.set('delivery', mockDelivery);
      controller.checkProjectPermissions();
    });
    assert.verifySteps(['willPerform', 'get-permissions', 'didFail']);
  });
});
