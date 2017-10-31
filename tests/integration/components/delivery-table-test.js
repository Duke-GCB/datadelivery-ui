import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('delivery-table', 'Integration | Component | delivery table', {
  integration: true
});

test('it renders', function(assert) {
  const deliveries = [{id: 1}, {id: 2}, {id: 3}];
  this.set('deliveries', deliveries);

  this.render(hbs`{{delivery-table deliveries}}`);
  assert.equal(this.$('.delivery-table-header').length, 1); // 1 header
  assert.equal(this.$('.delivery-table-row').length, 3); // 3 rows
});
