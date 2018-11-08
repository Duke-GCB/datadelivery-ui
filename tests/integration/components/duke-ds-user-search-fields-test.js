import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('duke-ds-user-search-fields', 'Integration | Component | duke ds user search fields', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{duke-ds-user-search-fields}}`);
  assert.equal(this.$('label.control-label').text().trim(), 'Search By');
  assert.equal(this.$('label.mode').eq(0).text().trim(), 'Name');
  assert.equal(this.$('label.mode').eq(1).text().trim(), 'NetID');
  assert.equal(this.$('label.mode').eq(2).text().trim(), 'Email');
});

test('it calls onSearch with name, username, and email modes', function(assert) {
  const modesAndQueries = [
    {query: 'Jane Doe', mode: 'full_name_contains', placeholder: 'Full or Partial Name'},
    {query: 'jdoe123', mode: 'username', placeholder: 'Exact Duke NetID'},
    {query: 'jane.doe@example.org', mode: 'email', placeholder: 'Exact Email Address'}
  ];

  assert.expect(modesAndQueries.length * 2); // two assertions for every mode
  modesAndQueries.forEach((testParam) => {
    const onSearch = function(searchParam) {
      assert.deepEqual(searchParam[testParam.mode], testParam.query);
    };
    this.set('onSearch', onSearch);
    this.render(hbs`{{duke-ds-user-search-fields onSearch=onSearch}}`);
    this.$('input.query-field').val(testParam.query);
    this.$('input.query-field').change(); // change() is required to trigger the update
    // Click the mode's radio button
    this.$('input[type=radio].' + testParam.mode).click();
    // Verify the placeholder is updated
    assert.equal(this.$('input.query-field').attr('placeholder'), testParam.placeholder);
    // Click Search
    this.$('button').click();
  });
});
