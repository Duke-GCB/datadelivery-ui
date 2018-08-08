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
