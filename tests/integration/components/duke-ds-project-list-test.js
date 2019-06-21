import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | duke ds project list', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders a list of projects', async function(assert) {
    this.set('projects', [
      {name: 'Project1'},
      {name: 'Project2'}
    ]);

    await render(hbs`{{duke-ds-project-list projects}}`);
    assert.equal(this.$('.duke-ds-project-name').eq(0).text().trim(), 'Project Name'); //header
    // index 1 is the search box
    assert.equal(this.$('.duke-ds-project-name').eq(2).text().trim(), 'Project1');
    assert.equal(this.$('.duke-ds-project-name').eq(3).text().trim(), 'Project2');
  });

  test('it sends selected project to selectionChanged action', async function(assert) {
    assert.expect(1);
    this.set('projects', [
      {name: 'Project1'},
      {name: 'Project2'}
    ]);
    this.set('externalAction', (selectedItem) => assert.equal(selectedItem.name, 'Project2'));
    await render(hbs`{{duke-ds-project-list projects selectionChanged=(action externalAction)}}`);
    this.$('.duke-ds-project-name').eq(3).click(); //click Project 2 row
  });
});
