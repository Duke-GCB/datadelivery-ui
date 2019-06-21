import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, click, fillIn, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | duke ds user search fields', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{duke-ds-user-search-fields}}`);
    assert.equal(find('label.control-label').textContent.trim(), 'Search By');
    assert.equal(this.$('label.mode').eq(0).text().trim(), 'Name');
    assert.equal(this.$('label.mode').eq(1).text().trim(), 'NetID');
    assert.equal(this.$('label.mode').eq(2).text().trim(), 'Email');
  });

  test('it calls onSearch with name modes', async function(assert) {
    let testParam = {query: 'Jane Doe', mode: 'full_name_contains', placeholder: 'Full or Partial Name'};
    const onSearch = function(searchParam) {
      assert.deepEqual(searchParam[testParam.mode], testParam.query);
    };
    this.set('onSearch', onSearch);
    await render(hbs`{{duke-ds-user-search-fields onSearch=onSearch}}`);
    await fillIn('input.query-field', testParam.query);
    await triggerEvent('input.query-field', 'change'); // change() is required to trigger the update
    // Click the mode's radio button
    this.$('input[type=radio].' + testParam.mode).click();
    // Verify the placeholder is updated
    assert.equal(find('input.query-field').getAttribute('placeholder'), testParam.placeholder);
    // Click Search
    await click('button');
  });

  test('it calls onSearch with username mode', async function(assert) {
    let testParam = {query: 'jdoe123', mode: 'username', placeholder: 'Exact Duke NetID'};
    const onSearch = function(searchParam) {
      assert.deepEqual(searchParam[testParam.mode], testParam.query);
    };
    this.set('onSearch', onSearch);
    await render(hbs`{{duke-ds-user-search-fields onSearch=onSearch}}`);
    await fillIn('input.query-field', testParam.query);
    await triggerEvent('input.query-field', 'change'); // change() is required to trigger the update
    // Click the mode's radio button
    this.$('input[type=radio].' + testParam.mode).click();
    // Verify the placeholder is updated
    assert.equal(find('input.query-field').getAttribute('placeholder'), testParam.placeholder);
    // Click Search
    await click('button');
  });

  test('it calls onSearch with email mode', async function(assert) {
    let testParam = {query: 'jane.doe@example.org', mode: 'email', placeholder: 'Exact Email Address'};
    const onSearch = function(searchParam) {
      assert.deepEqual(searchParam[testParam.mode], testParam.query);
    };
    this.set('onSearch', onSearch);
    await render(hbs`{{duke-ds-user-search-fields onSearch=onSearch}}`);
    await fillIn('input.query-field', testParam.query);
    await triggerEvent('input.query-field', 'change'); // change() is required to trigger the update
    // Click the mode's radio button
    this.$('input[type=radio].' + testParam.mode).click();
    // Verify the placeholder is updated
    assert.equal(find('input.query-field').getAttribute('placeholder'), testParam.placeholder);
    // Click Search
    await click('button');
  });
});
