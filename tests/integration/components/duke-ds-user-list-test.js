import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('duke-ds-user-list', 'Integration | Component | duke ds user list', {
  integration: true
});

test('it renders a list of users sorted by fullName', function(assert) {
  this.set('users', [
    {id:'1', fullName: 'Joe', email: 'joe@joe.org'},
    {id:'2', fullName: 'Jim', email: 'jim@jim.org'},
  ]);
  this.set('externalAction', function () {});
  this.render(hbs`{{duke-ds-user-list users selectionChanged=(action externalAction)}}`);

  //assert.equal(this.$().html().trim(), 'Project Name');
  assert.equal(this.$('.duke-ds-user-fullName').eq(0).text().trim(), 'Name'); //header
  assert.equal(this.$('.duke-ds-user-email').eq(0).text().trim(), 'Email'); //header
  // index 1 is the search box
  assert.equal(this.$('.duke-ds-user-fullName').eq(2).text().trim(), 'Jim');
  assert.equal(this.$('.duke-ds-user-email').eq(2).text().trim(), 'jim@jim.org');
  assert.equal(this.$('.duke-ds-user-fullName').eq(3).text().trim(), 'Joe');
  assert.equal(this.$('.duke-ds-user-email').eq(3).text().trim(), 'joe@joe.org');
});

test('it sends selected project to selectionChanged action', function(assert) {
  assert.expect(1);
  this.set('users', [
    {fullName: 'Joe', email: 'joe@joe.org'},
    {fullName: 'Jim', email: 'jim@jim.org'},
  ]);
  this.set('externalAction', function (actionData) {
    if (actionData.selectedItems[0]) {
      assert.equal(actionData.selectedItems[0].fullName, 'Jim');
    }
  });
  this.render(hbs`{{duke-ds-user-list users selectionChanged=(action externalAction)}}`);
  this.$('.duke-ds-user-fullName').eq(2).click(); //click Jim row
});
