import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | az-project-size', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders Calculated when empty', async function(assert) {
    this.set('deliverySummary', null);
    await render(hbs`{{az-project-size deliverySummary=deliverySummary}}`);
    assert.equal(this.element.textContent.trim(), 'Calculating');
  });

  test('it renders details', async function(assert) {
    const deliverySummary = EmberObject.create({
      total_size: 1024,
      file_count: 3,
      folder_count: 3,
      root_folder_count: 3,
      error_msg: "",

    });
    this.set('deliverySummary', deliverySummary);
    await render(hbs`{{az-project-size deliverySummary=deliverySummary}}`);
    assert.equal(this.element.textContent.trim().replaceAll("\n", "").replaceAll("      ", " "),
      '3 top-level folders, 0 subfolders, 3 files (1 KiB)');
  });

  test('it renders error when set', async function(assert) {
    const deliverySummary = EmberObject.create({
      error_msg:"Missing details"
    });
    this.set('deliverySummary', deliverySummary);
    await render(hbs`{{az-project-size deliverySummary=deliverySummary}}`);
    assert.equal(this.element.textContent.trim(), 'Error: Missing details');
  });
});
