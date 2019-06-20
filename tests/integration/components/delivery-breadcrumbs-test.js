import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('delivery-breadcrumbs', 'Integration | Component | delivery breadcrumbs', {
  integration: true
});

test('it renders a breadcrumb-item for each crumb with label, routeName, and links non-selected', function(assert) {
  this.render(hbs`{{delivery-breadcrumbs currentRouteName='deliveries'}}`);
  assert.equal(this.$('.breadcrumb-item').length, 2);
  assert.equal(this.$('.breadcrumb-item:eq(0)').text().trim(), 'Home');
  assert.equal(this.$('.breadcrumb-item:eq(1)').text().trim(), 'Deliveries');
  assert.equal(this.$('.breadcrumb-item a').length, 1);
  assert.equal(this.$('.breadcrumb-item a').text().trim(), 'Home');
});
