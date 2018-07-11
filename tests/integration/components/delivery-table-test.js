import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('delivery-table', 'Integration | Component | delivery table', {
  integration: true
});

function removeMultipleSpacesAndNewlines(str) {
  return str.replace(/ +/g, ' ').replace(/\n/g, '');
}

test('it renders', function(assert) {
  const transfers = [{
    id: 3,
    project: {name: 'Taco'},
    fromUser: {fullName: 'Arthur Adamson'},
    toUsersNames: 'Zelda Zellington',
    status: 'pending'
  }, {
    id: 2,
    project: {name: 'Burger'},
    fromUser: {fullName: 'Zelda Zellington'},
    toUsersNames: 'Arthur Adamson',
    status: 'accepted'
  }, {
    id: 3,
    project: {name: 'Pizza'},
    fromUser: {fullName: 'Arthur Adamson'},
    toUsersNames: 'Zelda Zellington',
    status: 'rejected'

  }];
  this.set('transfers', transfers);

  this.render(hbs`{{delivery-table transfers}}`);

  assert.equal(this.$('thead tr').length, 2); // 2 header (label and search box)
  assert.equal(this.$('tbody tr').length, 3); // 3 rows
  assert.equal(this.$('tbody tr a').length, 3); // each row should be selectable

  // displays expected column names
  const columnNames = removeMultipleSpacesAndNewlines(this.$('thead tr th').text().trim());
  assert.equal(columnNames, 'Project Name  From  To  State');

  const firstField = removeMultipleSpacesAndNewlines(this.$('tbody tr td').eq(0).text().trim());
  assert.equal(firstField, 'Taco');
  const secondField = removeMultipleSpacesAndNewlines(this.$('tbody tr td').eq(1).text().trim());
  assert.equal(secondField, 'Arthur Adamson');
  const thirdField = removeMultipleSpacesAndNewlines(this.$('tbody tr td').eq(2).text().trim());
  assert.equal(thirdField, 'Zelda Zellington');
  const fourthField = removeMultipleSpacesAndNewlines(this.$('tbody tr td').eq(3).text().trim());
  assert.equal(fourthField, 'pending');
});
