import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | duke ds auth provider affiliate list', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders a list of affiliates sorted by fullName', async function(assert) {
    this.set('affiliates', [
      {uid:'1', fullName: 'Joe', email: 'joe@joe.org'},
      {uid:'2', fullName: 'Jim', email: 'jim@jim.org'},
    ]);
    this.set('externalAction', function () {});
    await render(hbs`{{duke-ds-auth-provider-affiliate-list affiliates selectionChanged=(action externalAction)}}`);

    assert.equal(this.$('.duke-ds-auth-provider-affiliate-fullName').eq(1).text().trim(), 'Jim');
    assert.equal(this.$('.duke-ds-auth-provider-affiliate-email').eq(1).text().trim(), 'jim@jim.org');
    assert.equal(this.$('.duke-ds-auth-provider-affiliate-netid').eq(1).text().trim(), '2');
    assert.equal(this.$('.duke-ds-auth-provider-affiliate-fullName').eq(2).text().trim(), 'Joe');
    assert.equal(this.$('.duke-ds-auth-provider-affiliate-email').eq(2).text().trim(), 'joe@joe.org');
    assert.equal(this.$('.duke-ds-auth-provider-affiliate-netid').eq(2).text().trim(), '1');
  });

  test('it sends selected affiliates to selectionChanged action', async function(assert) {
    assert.expect(1);
    this.set('affiliates', [
      {fullName: 'Joe', email: 'joe@joe.org'},
      {fullName: 'Jim', email: 'jim@jim.org'},
    ]);
    this.set('externalAction', function (selectedItems) {
      assert.equal(selectedItems[0].fullName, 'Jim');
    });
    await render(hbs`{{duke-ds-auth-provider-affiliate-list affiliates selectionChanged=(action externalAction)}}`);
    this.$('.duke-ds-auth-provider-affiliate-fullName').eq(1).click(); //click Jim row
  });

  test('it sorts affiliate list without calling selectionChanged', async function(assert) {
    assert.expect(2);
    this.set('affiliates', [
      {uid:'1', fullName: 'B', email: 'b@b.org'},
      {uid:'2', fullName: 'A', email: 'a@a.org'},
    ]);
    this.set('externalAction', function () {
      assert.ok(false); // should not call this
    });
    await render(hbs`{{duke-ds-auth-provider-affiliate-list affiliates selectionChanged=(action externalAction)}}`);
    assert.equal(this.$('.duke-ds-auth-provider-affiliate-fullName').eq(1).text().trim(), 'A');
    assert.equal(this.$('.duke-ds-auth-provider-affiliate-fullName').eq(2).text().trim(), 'B');
  });
});
