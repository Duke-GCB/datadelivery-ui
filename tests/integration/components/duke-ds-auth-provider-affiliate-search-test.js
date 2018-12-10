import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('duke-ds-auth-provider-affiliate-search', 'Integration | Component | duke ds auth provider affiliate search', {
  integration: true
});

test('it renders search fields and a user listing', function(assert) {
  this.render(hbs`{{duke-ds-auth-provider-affiliate-search}}`);
  assert.equal(this.$('.duke-ds-user-search-fields').length, 1);
  assert.equal(this.$('.duke-ds-auth-provider-affiliate-list').length, 1);
});
