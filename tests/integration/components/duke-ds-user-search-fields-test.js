import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('duke-ds-user-search-fields', 'Integration | Component | duke ds user search fields', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{duke-ds-user-search-fields labelText='Search Label'}}`);
  assert.equal(this.$('label.control-label').text().trim(), 'Search Label');
  assert.equal(this.$('label.mode').text().trim(), 'Name NetID Email');
});

test('it calls onSearch with name, username, and email modes', function(assert) {
  const modesAndQueries = [
    {query: 'Jane Doe', mode: 'full_name_contains', placeholder: 'Full Name'},
    {query: 'jdoe123', mode: 'username', placeholder: 'Duke NetID'},
    {query: 'jane.doe@example.org', mode: 'email', placeholder: 'Email Address'}
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
