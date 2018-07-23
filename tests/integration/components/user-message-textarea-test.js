import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from "ember";

moduleForComponent('user-message-textarea', 'Integration | Component | user message textarea', {
  integration: true
});

test('it renders value', function(assert) {
  const delivery = Ember.Object.create({
    id: 3,
    userMessage: 'some details'
  });
  this.set('delivery', delivery);
  this.render(hbs`{{user-message-textarea value=delivery.userMessage readonly=true}}`);
  assert.equal(this.$('textarea').val(), 'some details');
});
