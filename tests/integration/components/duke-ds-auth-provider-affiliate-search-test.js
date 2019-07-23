import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | duke ds auth provider affiliate search', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders search fields and a user listing', async function(assert) {
    await render(hbs`{{duke-ds-auth-provider-affiliate-search}}`);
    assert.equal(findAll('.duke-ds-user-search-fields').length, 1);
    assert.equal(findAll('.duke-ds-auth-provider-affiliate-list').length, 1);
  });
});
