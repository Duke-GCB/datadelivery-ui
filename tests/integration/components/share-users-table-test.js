import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | share-users-table', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders with message when empty', async function(assert) {
    await render(hbs`{{share-users-table}}`);
    assert.equal(this.$('.share-users-table-no-users-message').text().trim(), "No users selected");
  });

  test('it renders without message when has content', async function(assert) {
    this.set('shareUsers', [{}]);
    await render(hbs`{{share-users-table shareUsers=shareUsers}}`);
    assert.equal(this.$('.share-users-table-no-users-message').text().trim(), "");
  });

  test('it renders users that can be deleted', async function(assert) {
    assert.expect(5);
    this.set('removeUser', function (user) {
      assert.equal(user.username, 'john');
    });

    this.set('shareUsers', [{
      'fullName': 'John Smith',
      'username': 'john',
      'email': 'john@smith.com',
    }]);
    await render(hbs`{{share-users-table shareUsers=shareUsers removeUser=removeUser}}`);
    assert.equal(this.$('.share-users-table-tbody td').eq(0).text().trim(), "John Smith");
    assert.equal(this.$('.share-users-table-tbody td').eq(1).text().trim(), "john");
    assert.equal(this.$('.share-users-table-tbody td').eq(2).text().trim(), "john@smith.com");
    assert.equal(this.$('.share-users-table-tbody td button').text().trim(), "Remove");

    this.$('.share-users-table-tbody td button').click();
  });

  test('it runs a method when add user is clicked', async function(assert) {
    assert.expect(2);
    this.set('addUser', function () {
      assert.equal(true, true);
    });
    this.set('shareUsers', [{}]);
    await render(hbs`{{share-users-table shareUsers=shareUsers addUser=addUser}}`);
    assert.equal(this.$('.share-users-table-footer button').text().trim(), "Add User");
    this.$('.share-users-table-footer button').click();
  });
});
