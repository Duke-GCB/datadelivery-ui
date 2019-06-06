import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('duke-ds-project', 'Unit | Model | duke ds project', {
  needs: []
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

test('it calls adapter.getSummary() on getSummary', function (assert) {
  assert.expect(3);
  const response = {'duke-ds-project-summaries': []};
  this.store().set('adapterFor', (modelName) => {
    return {
      getSummary(projectId) {
        assert.equal(modelName, 'duke-ds-project');
        assert.equal(projectId, 123);
        return Ember.RSVP.resolve(response);
      }
    }
  });
  let model = this.subject({id:123});
  model.getSummary().then(summary => {
    assert.equal(summary, response);
  });
});
