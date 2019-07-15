import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('duke-ds-project-size', 'Integration | Component | duke ds project size', {
  integration: true
});

test('it renders summary', function (assert) {
  const ddsProjectSummary = {
    total_size: 5 * 1024 * 1024 * 1024,
    file_count: 345,
    folder_count: 47,
    root_folder_count: 1
  };
  this.set('ddsProjectSummary', ddsProjectSummary);
  this.render(hbs`{{duke-ds-project-size ddsProjectSummary}}`);
  assert.equal(this.$('.duke-ds-project-size').text().trim(), '1 top-level folder, 46 subfolders,\n  345 files\n  (5 GiB)');
});

test('it renders loading state while summary is null', function(assert) {
  this.set('ddsProjectSummary', null);
  this.render(hbs`{{duke-ds-project-size ddsProjectSummary}}`);
  assert.equal(this.$('.duke-ds-project-size').text().trim(), 'Calculating');
});
