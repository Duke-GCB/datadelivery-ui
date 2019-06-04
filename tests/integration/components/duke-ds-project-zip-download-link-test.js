import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('duke-ds-project-zip-download-link', 'Integration | Component | duke ds project zip download link', {
  integration: true
});

test('it renders link to download project with filename text', function(assert) {
  const ddsProject = Ember.Object.create({
    id: 'abc-123',
    name: 'ProjectName'
  });
  this.set('ddsProject', ddsProject);
  this.render(hbs`{{duke-ds-project-zip-download-link ddsProject}}`);
  assert.equal(this.$('a.duke-ds-project-zip-download-link').text().trim(), 'ProjectName.zip');
  assert.equal(this.$('a.duke-ds-project-zip-download-link').attr('href'), 'http://testhost/download/dds-projects/abc-123/ProjectName.zip');
});

