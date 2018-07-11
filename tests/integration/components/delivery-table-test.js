import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('delivery-table', 'Integration | Component | delivery table', {
  integration: true
});

test('it renders', function(assert) {
  const transfers = [{id: 1}, {id: 2}, {id: 3}];
  this.set('transfers', transfers);

  this.render(hbs`{{delivery-table transfers}}`);

  assert.equal(this.$('thead tr').length, 2); // 2 header (label and search box)
  assert.equal(this.$('tbody tr').length, 3); // 3 rows
  assert.equal(this.$('tbody tr a').length, 3); // each row should be selectable

  // displays expected column names
  const columnNames = this.$('thead tr th').text().trim().replace(/ +/g, ' ').replace(/\n/g, '');
  assert.equal(columnNames, 'Project Name  From  To  State');
});
