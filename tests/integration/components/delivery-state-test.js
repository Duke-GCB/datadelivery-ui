import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('delivery-state', 'Integration | Component | delivery state', {
  integration: true
});

test('it renders the state', function(assert) {
  // Handle any actions with this.on('myAction', function(val) { ... });
  const delivery = Ember.Object.create({status: 'accepted'});
  this.set('delivery', delivery);
  this.render(hbs`{{delivery-state record=delivery}}`);
  assert.equal(this.$().text().trim(), 'Accepted');
});
