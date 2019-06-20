import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from "ember";

moduleForComponent('breadcrumb-item', 'Integration | Component | breadcrumb item', {
  integration: true
});

test('it renders without link when selected', function(assert) {
  this.render(hbs`{{breadcrumb-item label="All" routeName="item.index" selectedRouteName="item.index"}}`);
  assert.equal(this.$('.breadcrumb-item').text().trim(), 'All');
  assert.equal(this.$('.breadcrumb-item a').length, 0);
});

test('it renders without link when not selected', function(assert) {
  this.render(hbs`{{breadcrumb-item label="SomeItem" routeName="item.show" selectedRouteName="item.index"}}`);
  assert.equal(this.$().text().trim(), 'SomeItem');
  assert.equal(this.$('a').length, 1);
  assert.equal(this.$('a').text().trim(), 'SomeItem');
});

test('it renders with context without link when not selected', function(assert) {
  const delivery = Ember.Object.create({
    id: 3,
  });
  this.set('delivery', delivery);
  this.render(hbs`{{breadcrumb-item label="SomeItem"
                                    routeName="item.show"
                                    context=delivery
                                    selectedRouteName="item.index"}}`);
  assert.equal(this.$().text().trim(), 'SomeItem');
  assert.equal(this.$('a').length, 1);
  assert.equal(this.$('a').text().trim(), 'SomeItem');
});
