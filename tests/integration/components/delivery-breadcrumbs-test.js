import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from "ember";

moduleForComponent('delivery-breadcrumbs', 'Integration | Component | delivery breadcrumbs', {
  integration: true
});

test('it renders All Deliveries when deliveries.index selected', function(assert) {
  this.render(hbs`{{delivery-breadcrumbs selectedRouteName="deliveries.index"}}`);
  assert.equal(this.$('li').text().trim(), 'All Deliveries');
  assert.equal(this.$('a').length, 0, 'contains no anchors');
});

test('it renders with delivery.show selected', function(assert) {
  const delivery = Ember.Object.create({
    id: 3,
    transfer: {
      project: {
        name: 'Some Project'
      }
    }
  });
  this.set('delivery', delivery);
  this.render(hbs`{{delivery-breadcrumbs selectedRouteName="deliveries.show" delivery=delivery}}`);
  assert.equal(this.$('a').length, 1, 'there is one anchor');

  assert.equal(this.$('a').text().trim(), 'All Deliveries', 'All Deliveries is a link');
  assert.equal(this.$('li').eq(1).text().trim(), 'Some Project', 'displays project name as text');
});

test('it renders with delivery.resend selected', function(assert) {
  const delivery = Ember.Object.create({
    id: 3,
    transfer: {
      project: {
        name: 'Some Project'
      }
    }
  });
  this.set('delivery', delivery);
  this.render(hbs`{{delivery-breadcrumbs selectedRouteName="deliveries.show.resend" delivery=delivery}}`);
  assert.equal(this.$('a').eq(0).text().trim(), 'All Deliveries');
  assert.equal(this.$('a').eq(1).text().trim(), 'Some Project');
  assert.equal(this.$('a').length, 2, 'There are two links to parent routes.');
  assert.equal(this.$('li').eq(2).text().trim(), 'resend', 'show resend as text');
});
