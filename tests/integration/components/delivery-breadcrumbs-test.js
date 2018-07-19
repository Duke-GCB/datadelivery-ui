import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from "ember";

moduleForComponent('delivery-breadcrumbs', 'Integration | Component | delivery breadcrumbs', {
  integration: true
});

test('it renders Data Delivery when deliveries.index selected', function(assert) {
  this.render(hbs`{{delivery-breadcrumbs selectedRouteName="deliveries.index"}}`);
  assert.equal(this.$('li').text().trim(), 'Data Delivery');
  assert.equal(this.$('a').length, 0, 'contains no anchors');
});

test('it renders with delivery.show selected', function(assert) {
  const transfer = Ember.Object.create({
    project: {
      name: 'Some Project'
    }
  });
  this.set('transfer', transfer);
  this.render(hbs`{{delivery-breadcrumbs selectedRouteName="deliveries.show" transfer=transfer}}`);
  assert.equal(this.$('a').length, 1, 'there is one anchor');

  assert.equal(this.$('a').text().trim(), 'Data Delivery', 'Data Delivery is a link');
  assert.equal(this.$('li').eq(1).text().trim(), 'Some Project', 'displays project name as text');
});

test('it renders with delivery.resend selected', function(assert) {
  const transfer = Ember.Object.create({
    project: {
      name: 'Some Project'
    }
  });
  this.set('transfer', transfer);
  this.render(hbs`{{delivery-breadcrumbs selectedRouteName="deliveries.show.resend" transfer=transfer}}`);
  assert.equal(this.$('a').eq(0).text().trim(), 'Data Delivery');
  assert.equal(this.$('a').eq(1).text().trim(), 'Some Project');
  assert.equal(this.$('a').length, 2, 'There are two links to parent routes.');
  assert.equal(this.$('li').eq(2).text().trim(), 'resend', 'show resend as text');
});
