import { resolve } from 'rsvp';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { run } from '@ember/runloop';

module('Unit | Model | duke ds project', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let model = run(() => this.owner.lookup('service:store').createRecord('duke-ds-project'));
    // let store = this.store();
    assert.ok(!!model);
  });

  test('it calls adapter.getSummary() on getSummary', function (assert) {
    assert.expect(3);
    const response = {'duke-ds-project-summaries': []};
    this.owner.lookup('service:store').set('adapterFor', (modelName) => {
      return {
        getSummary(projectId) {
          assert.equal(modelName, 'duke-ds-project');
          assert.equal(projectId, 123);
          return resolve(response);
        }
      };
    });
    let model = run(() => this.owner.lookup('service:store').createRecord('duke-ds-project', {id:123}));
    model.getSummary().then(summary => {
      assert.equal(summary, response);
    });
  });
});
