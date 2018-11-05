import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('duke-ds-user-search', 'Integration | Component | duke ds user search', {
  integration: true
});

test('it renders search fields and a user listing', function(assert) {
  this.render(hbs`{{duke-ds-user-search}}`);
  assert.equal(this.$('.duke-ds-user-search-fields').length, 1);
  assert.equal(this.$('.duke-ds-user-list').length, 1);
});
