import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from "ember";

moduleForComponent('delivery-detail', 'Integration | Component | delivery detail', {
  integration: true
});

test('it renders brief mode', function(assert) {
  const delivery = Ember.Object.create({
    id: 3,
    transfer: {
      id: 5,
      project: {name: 'Taco'},
      fromUser: {fullName: 'Arthur Adamson'},
      toUsers: [
        Ember.Object.create({ fullName: 'Zelda Zellington'})
      ],
      status: 'Done'
    },
    shareUsers: [
      {fullName: 'Bob Robertson'}
    ],
  });
  this.set('delivery', delivery);
  this.render(hbs`{{delivery-detail delivery brief=true}}`);
  assert.equal(this.$('label').eq(0).text(), 'From');
  assert.equal(this.$('label').eq(1).text(), 'To');
  assert.equal(this.$('label').length, 2);
});

test('it renders full mode', function(assert) {
  const delivery = Ember.Object.create({
    id: 3,
    transfer: {
      id: 5,
      project: {name: 'Taco'},
      fromUser: {fullName: 'Arthur Adamson'},
      toUsers: [
        Ember.Object.create({ fullName: 'Zelda Zellington'})
      ],
      status: 'Done'
    },
    shareUsers: [
      {fullName: 'Bob Robertson'}
    ],
    userMessage: 'Here is your data',
    deliveryEmailText: 'From: joe@joe.joe\n\nEmail Body'
  });
  this.set('delivery', delivery);
  this.render(hbs`{{delivery-detail delivery}}`);
  assert.equal(this.$('label').length, 5);
  var idx = 0;
  assert.equal(this.$('label').eq(idx).text().trim(), 'From');
  assert.equal(this.$('.row-value').eq(idx).text().trim(), 'Arthur Adamson');
  idx += 1;
  assert.equal(this.$('label').eq(idx).text(), 'To');
  assert.equal(this.$('.row-value').eq(idx).text().trim(), 'Zelda Zellington');
  idx += 1;
  assert.equal(this.$('label').eq(idx).text(), 'Status');
  assert.equal(this.$('.row-value').eq(idx).text().trim(), 'Done');
  idx += 1;
  assert.equal(this.$('label').eq(idx).text(), 'User Message');
  assert.equal(this.$('textarea').eq(0).val(), 'Here is your data');
  idx += 1;
  assert.equal(this.$('label').eq(idx).text(), 'Delivery Email');
  assert.equal(this.$('textarea').eq(1).text().trim(), 'From: joe@joe.joe\n\nEmail Body');
});

test('it renders full mode declineReason abd performedBy', function(assert) {
  const delivery = Ember.Object.create({
    id: 3,
    transfer: {
      id: 5,
      project: {name: 'Taco'},
      fromUser: {fullName: 'Arthur Adamson'},
      toUsers: [
        Ember.Object.create({ fullName: 'Zelda Zellington'})
      ],
      status: 'Done'
    },
    shareUsers: [
      {fullName: 'Bob Robertson'}
    ],
    userMessage: 'Here is your data',
    deliveryEmailText: 'From: joe@joe.joe\n\nEmail Body',
    declineReason: 'Was not needed.',
    performedBy: 'John Doe'
  });
  this.set('delivery', delivery);
  this.render(hbs`{{delivery-detail delivery}}`);
  assert.equal(this.$('label').length, 7);
  assert.equal(this.$('label').eq(3).text(), 'Decline Reason');
  assert.equal(this.$('.row-value').eq(3).text().trim(), 'Was not needed.');
  assert.equal(this.$('label').eq(4).text(), 'Performed By');
  assert.equal(this.$('.row-value').eq(4).text().trim(), 'John Doe');
});
