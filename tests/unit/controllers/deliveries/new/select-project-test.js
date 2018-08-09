import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('controller:deliveries/new/select-project', 'Unit | Controller | deliveries/new/select project', {
  // Specify the other units that are required for this test.
  needs: ['controller:application', 'service:session', 'service:duke-ds-user', 'model:duke-ds-project-permission']
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
      assert.equal(routeName, 'deliveries', 'back action should transition to deliveries');
    }
  });
  controller.send('back');
});

test('it handles next action', function(assert) {
  let project = Ember.Object.create({ id: '123' });
  let controller = this.subject({
    project: project,
    currentUserCanDeliver: true,
    transitionToRoute(routeName, data) {
      assert.equal(routeName, 'deliveries.new.select-recipient', 'next action should transition to recipient selection');
      assert.equal(data.queryParams.projectId, '123', 'next action should pass projectId');
    }
  });
  controller.send('next');
});

test('it handles projectSelectionChanged', function(assert) {
  let project = Ember.Object.create({ id: '123' });
  let controller = this.subject({
    project: null,
  });
  controller.send('projectSelectionChanged', {
    selectedItems: [
      project
    ]
  });
  assert.equal(controller.get('project'), project);
});


test('it enables showMissingPrivilegesError when user clicks Next but has no permission', function(assert) {
  let project = Ember.Object.create({ id: '123' });
  let controller = this.subject({
    project: project,
    transitionToRoute: function () {}
  });
  assert.equal(controller.get('showMissingPrivilegesError'), false,
    'showMissingPrivilegesError defaults to false');

  controller.set('currentUserCanDeliver', false);
  controller.send('next');
  assert.equal(controller.get('showMissingPrivilegesError'), true,
    'showMissingPrivilegesError is true if user sends and has no permissions');

  // user selects a project
  controller.send('projectSelectionChanged', {
    selectedItems: [
      project
    ]
  });
  assert.equal(controller.get('showMissingPrivilegesError'), false,
    'showMissingPrivilegesError resets on selection changed');

  controller.set('currentUserCanDeliver', true);
  controller.send('next');
  assert.equal(controller.get('showMissingPrivilegesError'), false,
        'showMissingPrivilegesError is false if user sends and has permissions');
});
