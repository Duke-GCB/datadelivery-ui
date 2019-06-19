import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from "ember";

moduleForComponent('delivery-breadcrumbs', 'Integration | Component | delivery breadcrumbs', {
  integration: true
});

test('it renders an li for each crumb and an a for the non-selected routes', function(assert) {
  this.render(hbs`{{delivery-breadcrumbs currentRouteName='deliveries'}}`);
  assert.equal(this.$('li').length, 2);
  assert.equal(this.$('li:eq(0)').text().trim(), 'Home');
  assert.equal(this.$('li:eq(1)').text().trim(), 'Deliveries');
  assert.equal(this.$('a').length, 1);
  assert.equal(this.$('a').text().trim(), 'Home');
});
