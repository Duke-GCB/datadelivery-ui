import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from "ember";

moduleForComponent('delivery-detail', 'Integration | Component | delivery detail', {
  integration: true
});

test('it renders brief mode', function(assert) {
  const transfer = Ember.Object.create({
    id: 5,
    project: {name: 'Taco'},
    fromUser: {fullName: 'Arthur Adamson'},
    toUsersNames: [ 'Zelda Zellington' ],
    status: 'Done',
    delivery: Ember.Object.create({
      shareUsers: [
        {fullName: 'Bob Robertson'}
      ],
    })
  });

  this.set('transfer', transfer);
  this.render(hbs`{{delivery-detail transfer brief=true}}`);
  assert.equal(this.$('label').eq(0).text(), 'From');
  assert.equal(this.$('label').eq(1).text(), 'To');
  assert.equal(this.$('label').length, 2);
});

test('it renders full mode', function(assert) {
  const transfer = Ember.Object.create({
    id: 5,
    project: {name: 'Taco'},
    fromUser: {fullName: 'Arthur Adamson'},
    toUsersNames: ['Zelda Zellington'],
    status: 'Done',
    delivery: Ember.Object.create({
      id: 3,
      shareUsers: [
        {fullName: 'Bob Robertson'}
      ],
      userMessage: 'Here is your data',
      deliveryEmailText: 'Subject: New Data\n\nEmail Body'
    })
  });

  this.set('transfer', transfer);
  this.render(hbs`{{delivery-detail transfer}}`);
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
  assert.equal(this.$('textarea').eq(1).text().trim(), 'Subject: New Data\n\nEmail Body');
});

test('it renders full mode declineReason and performedBy', function(assert) {
  const transfer = Ember.Object.create({
      id: 5,
      project: {name: 'Taco'},
      fromUser: {fullName: 'Arthur Adamson'},
      toUsersNames: ['Zelda Zellington'],
      status: 'Done',
    delivery:  Ember.Object.create({
      shareUsers: [
        {fullName: 'Bob Robertson'}
      ],
      userMessage: 'Here is your data',
      deliveryEmailText: 'Subject: Hello\n\nEmail Body',
      declineReason: 'Was not needed.',
      performedBy: 'John Doe'
    }),
  });
  this.set('transfer', transfer);
  this.render(hbs`{{delivery-detail transfer}}`);
  assert.equal(this.$('label').eq(3).text(), 'Decline Reason');
  assert.equal(this.$('.row-value').eq(3).text().trim(), 'Was not needed.');
  assert.equal(this.$('label').eq(4).text(), 'Performed By');
  assert.equal(this.$('.row-value').eq(4).text().trim(), 'John Doe');
});
