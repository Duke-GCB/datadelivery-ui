import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, click } from '@ember/test-helpers';
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

  test('it calls onSearch with name, username, and email modes', async function(assert) {
    const modesAndQueries = [
      {query: 'Jane Doe', mode: 'full_name_contains', placeholder: 'Full or Partial Name'},
      {query: 'jdoe123', mode: 'username', placeholder: 'Exact Duke NetID'},
      {query: 'jane.doe@example.org', mode: 'email', placeholder: 'Exact Email Address'}
    ];

    assert.expect(modesAndQueries.length * 2); // two assertions for every mode
    for (var i = 0; i < modesAndQueries.length; i++) {
      const testParam = modesAndQueries[i];
      const onSearch = function (searchParam) {
        assert.deepEqual(searchParam[testParam.mode], testParam.query);
      };
      this.set('onSearch', onSearch);
      await this.render(hbs`{{duke-ds-user-search-fields onSearch=onSearch}}`);
      await this.$('input.query-field').val(testParam.query);
      await this.$('input.query-field').change(); // change() is required to trigger the update
      // Click the mode's radio button
      await click('input[type=radio].' + testParam.mode);
      // Verify the placeholder is updated
      assert.equal(this.$('input.query-field').attr('placeholder'), testParam.placeholder);
      // Click Search
      this.$('button').click();
    }
  });
  ///});
});
