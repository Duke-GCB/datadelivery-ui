import { resolve } from 'rsvp';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Model | duke ds project', function(hooks) {
  setupTest(hooks);

  test('it exists', async function(assert) {
    let model = await this.owner.lookup('service:store').createRecord('duke-ds-project');
    assert.ok(!!model);
  });

  test('it calls adapter.getSummary() on getSummary', async function (assert) {
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
    let model = await this.owner.lookup('service:store').createRecord('duke-ds-project', {id:123});
    let summary = await model.getSummary();
    assert.equal(summary, response);
  });
});
