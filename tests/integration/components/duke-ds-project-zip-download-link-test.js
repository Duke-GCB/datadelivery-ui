import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | duke ds project zip download link', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders link to download project with filename text', async function(assert) {
    const ddsProject = EmberObject.create({
      id: 'abc-123',
      name: 'ProjectName'
    });
    this.set('ddsProject', ddsProject);
    await render(hbs`{{duke-ds-project-zip-download-link ddsProject}}`);
    assert.equal(find('a.duke-ds-project-zip-download-link').textContent.trim(), 'ProjectName.zip');
    assert.equal(find('a.duke-ds-project-zip-download-link').getAttribute('href'), 'http://testhost/download/dds-projects/abc-123/ProjectName.zip');
  });
});

