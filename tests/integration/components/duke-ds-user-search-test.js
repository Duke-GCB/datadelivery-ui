import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('duke-ds-user-search', 'Integration | Component | duke ds user search', {
  integration: true
});

test('it renders search fields but no user list when no users', function(assert) {
  this.render(hbs`{{duke-ds-user-search}}`);
  assert.equal(this.$('.duke-ds-user-search-fields').length, 1);
  // When no users, don't render user list
  assert.equal(this.$('.duke-ds-user-list').length, 0);
});
