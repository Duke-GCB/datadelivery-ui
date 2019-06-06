import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('duke-ds-project-link', 'Integration | Component | duke ds project link', {
  integration: true
});

test('it renders link to project with link text', function(assert) {
  const url = 'http://example.org/projects/123';
  const ddsProject = Ember.Object.create({ url: url });
  this.set('ddsProject', ddsProject);
  this.render(hbs`{{duke-ds-project-link ddsProject}}`);
  assert.equal(this.$('a.duke-ds-project-link').text().trim(), url);
  assert.equal(this.$('a.duke-ds-project-link').attr('href'), url);
});
