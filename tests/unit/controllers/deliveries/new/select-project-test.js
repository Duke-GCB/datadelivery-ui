import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('controller:deliveries/new/select-project', 'Unit | Controller | deliveries/new/select project', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
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

test('it handles next action and resets project', function(assert) {
  let project = Ember.Object.create({ id: '123' });
  let controller = this.subject({
    project: project,
    transitionToRoute(routeName, data) {
      assert.equal(routeName, 'deliveries.new.select-recipient', 'next action should transition to recipient selection');
      assert.equal(data.queryParams.project_id, '123', 'next action should pass project_id');
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
