import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('duke-ds-project-list', 'Integration | Component | duke ds project list', {
  integration: true
});

test('it renders a list of projects', function(assert) {
  this.set('projects', [
    {name: 'Project1'},
    {name: 'Project2'}
  ]);

  this.render(hbs`{{duke-ds-project-list projects}}`);
  assert.equal(this.$('.duke-ds-project-name').eq(0).text().trim(), 'Project Name'); //header
  // index 1 is the search box
  assert.equal(this.$('.duke-ds-project-name').eq(2).text().trim(), 'Project1');
  assert.equal(this.$('.duke-ds-project-name').eq(3).text().trim(), 'Project2');
});

test('it sends selected project to selectionChanged action', function(assert) {
  assert.expect(1);
  this.set('projects', [
    {name: 'Project1'},
    {name: 'Project2'}
  ]);
  this.set('externalAction', (actionData) => assert.equal(actionData.selectedItems[0].name, 'Project2'));
  this.render(hbs`{{duke-ds-project-list projects selectionChanged=(action externalAction)}}`);
  this.$('.duke-ds-project-name').eq(3).click(); //click Project 2 row
});
