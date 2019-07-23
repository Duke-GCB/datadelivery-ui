import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | duke ds project size', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders summary', async function (assert) {
    const ddsProjectSummary = {
      total_size: 5 * 1024 * 1024 * 1024,
      file_count: 345,
      folder_count: 47,
      root_folder_count: 1
    };
    this.set('ddsProjectSummary', ddsProjectSummary);
    await render(hbs`{{duke-ds-project-size ddsProjectSummary}}`);
    assert.equal(this.$('.duke-ds-project-size').text().trim(), '1 top-level folder, 46 subfolders,\n  345 files\n  (5 GiB)');
  });

  test('it renders loading state while summary is null', async function(assert) {
    this.set('ddsProjectSummary', null);
    await render(hbs`{{duke-ds-project-size ddsProjectSummary}}`);
    assert.equal(this.$('.duke-ds-project-size').text().trim(), 'Calculating');
  });
});
