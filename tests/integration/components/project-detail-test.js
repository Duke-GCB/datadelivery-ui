import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | project detail', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    const project = EmberObject.create({
      id: 123,
      name: 'Project ABC',
      isLoaded: true,
      getSummary() {}
    });

    this.set('project', project);
    await render(hbs`{{project-detail project}}`);
    assert.equal(findAll('.duke-ds-project-size').length, 1);
    assert.equal(findAll('.duke-ds-project-link').length, 1);
    assert.equal(findAll('.duke-ds-project-zip-download-link').length, 1);
  });
});
