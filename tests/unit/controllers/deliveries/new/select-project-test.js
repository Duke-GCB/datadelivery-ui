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

test('it computes currentUserProjectPermission from duke-ds-project-permission', function(assert) {
  let project = Ember.Object.create({ id: '123' });
  let currentDukeDsUser = Ember.Object.create({id: '456'});
  const permission = Ember.Object.create({id: '789'});
  let controller = this.subject({
    project: null,
    currentDukeDsUser: null,
    store: {
      query: function () {
        return Ember.RSVP.resolve(Ember.A([permission]));
      }
    }
  });
  assert.equal(controller.get('currentUserProjectPermission.authRole'), null);
  controller.set('project', project);
  controller.set('currentDukeDsUser', currentDukeDsUser);
  controller.get('currentUserProjectPermission').then(permission => assert.equal(permission.id, '789'));
});

test('it computes showUserMissingPrivilegesError from project and currentUserProjectPermission', function(assert) {
  let project = Ember.Object.create({ id: '123' });
  let controller = this.subject({
    project: null
  });
  assert.equal(controller.get('showUserMissingPrivilegesError'), false,
    'hide error when no project is selected');

  controller.set('project', project);
  assert.equal(controller.get('showUserMissingPrivilegesError'), false,
    'hide error when currentUserProjectAuthRole is empty');

  controller.set('currentUserProjectPermission', Ember.Object.create({ authRole: 'downloader'}));
  assert.equal(controller.get('showUserMissingPrivilegesError'), true,
    'show error when currentUserProjectAuthRole is not project admin');

  controller.set('currentUserProjectPermission', Ember.Object.create({ authRole: 'project_admin'}));
  assert.equal(controller.get('showUserMissingPrivilegesError'), false,
    'hide error when currentUserProjectAuthRole is project admin');
});
