import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from "ember";

moduleForComponent('user-message-textarea', 'Integration | Component | user message textarea', {
  integration: true
});

test('it renders value with readonly', function(assert) {
  const delivery = Ember.Object.create({
    id: 3,
    userMessage: 'some details'
  });
  this.set('delivery', delivery);
  this.render(hbs`{{user-message-textarea value=delivery.userMessage readonly=true}}`);
  assert.equal(this.$('label').text().trim(), 'User Message');
  assert.equal(this.$('textarea').attr('readonly'), 'readonly');
  assert.equal(this.$('textarea').text().trim(), 'some details');
  //TODO: why doesn't the textarea contents get filled in?
});

test('it renders value without readonly', function(assert) {
  const delivery = Ember.Object.create({
    id: 3,
    userMessage: 'some details'
  });
  this.set('delivery', delivery);
  this.render(hbs`{{user-message-textarea value=delivery.userMessage readonly=false}}`);
  assert.equal(this.$('label').text().trim(), 'User Message');
  assert.equal(this.$('textarea').attr('readonly'), null);
  assert.equal(this.$('textarea').text().trim(), 'some details');
  //TODO: why doesn't the textarea contents get filled in?
});

test('stuffs', function (assert) {
  //TODO:remove this test once I figure out how to enable the ember textarea for testing
  this.render(hbs`{{textarea value="Lots of static text that ISN'T bound" }}`);
  assert.equal(this.$().html(), 'ok');
});
