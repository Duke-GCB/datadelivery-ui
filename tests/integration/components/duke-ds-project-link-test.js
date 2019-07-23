import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | duke ds project link', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders link to project with link text', async function(assert) {
    const url = 'http://example.org/projects/123';
    const ddsProject = EmberObject.create({ url: url });
    this.set('ddsProject', ddsProject);
    await render(hbs`{{duke-ds-project-link ddsProject}}`);
    assert.equal(find('a.duke-ds-project-link').textContent.trim(), 'Browse at Duke Data Service');
    assert.equal(find('a.duke-ds-project-link').getAttribute('href'), url);
  });
});
