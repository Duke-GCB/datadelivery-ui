import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | duke ds project zip download link', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders link to download project with filename text', async function(assert) {
    const ddsProjectSummary = Ember.Object.create({
      total_size: 24 * 1024 * 1024
    });
    this.set('ddsProject', ddsProject);
    this.set('ddsProjectSummary', ddsProjectSummary);

    await render(hbs`{{duke-ds-project-zip-download-link ddsProject ddsProjectSummary}}`);
    assert.equal(this.$('a.duke-ds-project-zip-download-link').text().trim(), 'Download as Zip file (approx. 24 MiB)');
    assert.equal(this.$('a.duke-ds-project-zip-download-link').attr('href'), 'http://testhost/download/dds-projects/abc-123/ProjectName.zip');
  });

  test('it renders size as calculating while summary is empty', async function(assert) {
    const ddsProject = Ember.Object.create({
      id: 'abc-123',
      name: 'ProjectName'
    });
    this.set('ddsProject', ddsProject);
    this.set('ddsProjectSummary', null);

    await render(hbs`{{duke-ds-project-zip-download-link ddsProject ddsProjectSummary}}`);
    assert.equal(this.$('a.duke-ds-project-zip-download-link').text().trim(), 'Download as Zip file (Calculating Size...)');
    assert.equal(this.$('a.duke-ds-project-zip-download-link').attr('href'), 'http://testhost/download/dds-projects/abc-123/ProjectName.zip');
  });

});

