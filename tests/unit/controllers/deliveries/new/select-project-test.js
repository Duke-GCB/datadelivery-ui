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

test('it stops next action if user cannot deliver', function(assert) {
  assert.expect(0);
  let project = Ember.Object.create({ id: '123' });
  let controller = this.subject({
    project: project,
    currentUserCanDeliver: false,
    transitionToRoute() {
      assert('Should not transition if user cannot deliver.');
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

test('it computes currentUserProjectPermissions from duke-ds-project-permission', function(assert) {
  assert.expect(5);
  let project = Ember.Object.create({ id: '123' });
  let currentDukeDsUser = Ember.Object.create({id: '456'});
  let controller = this.subject({
    project: null,
    currentDukeDsUser: null,
    store: {
      query: function (modelName, params) {
        assert.equal(modelName, 'duke-ds-project-permission');
        assert.equal(params.project, '123');
        assert.equal(params.user, '456');
        return [
          'permissiondata'
        ]
      }
    }
  });
  assert.deepEqual(controller.get('currentUserProjectPermissions'), []);
  controller.set('project', project);
  controller.set('currentDukeDsUser', currentDukeDsUser);
  assert.deepEqual(controller.get('currentUserProjectPermissions'), ['permissiondata']);
});

test('it computes currentUserProjectAuthRole from currentUserProjectPermissions array', function(assert) {
  let controller = this.subject({
    currentUserProjectPermissions: []
  });
  assert.equal(controller.get('currentUserProjectAuthRole'), null)
  controller.set('currentUserProjectPermissions', [
    {'auth_role': 'project_admin'}
  ])
  assert.equal(controller.get('currentUserProjectAuthRole'), 'project_admin')
});

test('it computes currentUserProjectAuthRole from currentUserProjectPermissions array', function(assert) {
  let controller = this.subject({
    currentUserProjectPermissions: []
  });
  assert.equal(controller.get('currentUserProjectAuthRole'), null)
  controller.set('currentUserProjectPermissions', [
    {'auth_role': 'project_admin'}
  ])
  assert.equal(controller.get('currentUserProjectAuthRole'), 'project_admin')
});

test('it computes showUserMissingPrivilegesError from project and currentUserProjectAuthRole', function(assert) {
  let project = Ember.Object.create({ id: '123' });
  let controller = this.subject({
    project: null
  });
  assert.equal(controller.get('showUserMissingPrivilegesError'), false,
    'hide error when no project is selected');

  controller.set('project', project);
  assert.equal(controller.get('showUserMissingPrivilegesError'), false,
    'hide error when currentUserProjectAuthRole is empty');

  controller.set('currentUserProjectAuthRole', 'downloader');
  assert.equal(controller.get('showUserMissingPrivilegesError'), true,
    'show error when currentUserProjectAuthRole is not project admin');

  controller.set('currentUserProjectAuthRole', 'project_admin');
  assert.equal(controller.get('showUserMissingPrivilegesError'), false,
    'hide error when currentUserProjectAuthRole is project admin');
});
