import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('delivery-table-header', 'Integration | Component | delivery table header', {
  integration: true
});

test('it renders 5 th in a tr', function(assert) {
  this.render(hbs`{{delivery-table-header}}`);
  assert.equal(this.$('tr th').length, 4);
});
