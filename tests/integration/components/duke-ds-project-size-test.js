import { resolve } from 'rsvp';
import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | duke ds project size', function(hooks) {
  setupRenderingTest(hooks);

  test('it fetches and renders summary', async function(assert) {
    const summary = {
      total_size: 5 * 1024 * 1024 * 1024,
      file_count: 345,
      folder_count: 47
    };
    const ddsProject = EmberObject.create({
      isLoaded: true,
      getSummary() {
        return resolve(summary);
      }
    });
    this.set('ddsProject', ddsProject);
    await render(hbs`{{duke-ds-project-size ddsProject}}`);
    assert.equal(find('.duke-ds-project-size').textContent.trim(), 'TODO_total_size - 345 files, 47 folders');
  });

  test('it renders loading state while summary is null', async function(assert) {
    const ddsProject = EmberObject.create({
      isLoaded: true,
      getSummary() {
        return resolve(null);
      }
    });
    this.set('ddsProject', ddsProject);
    await render(hbs`{{duke-ds-project-size ddsProject}}`);
    assert.equal(find('.duke-ds-project-size').textContent.trim(), 'Calculating');
  });
});
