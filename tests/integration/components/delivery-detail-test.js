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
  assert.equal(this.$('.detail-label').eq(0).text(), 'From');
  assert.equal(this.$('.detail-label').eq(1).text(), 'To');
  assert.equal(this.$('.detail-label').length, 2);
});

test('it renders full mode', function(assert) {
  const transfer = Ember.Object.create({
    id: 5,
    isPending: true,
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
  assert.equal(this.$('.detail-label').length, 4);
  var idx = 0;
  assert.equal(this.$('.detail-label').eq(idx).text().trim(), 'From');
  assert.equal(this.$('.detail-value').eq(idx).text().trim(), 'Arthur Adamson');
  idx += 1;
  assert.equal(this.$('.detail-label').eq(idx).text(), 'To');
  assert.equal(this.$('.detail-value').eq(idx).text().trim(), 'Zelda Zellington');
  idx += 1;
  assert.equal(this.$('.detail-label').eq(idx).text(), 'Status');
  assert.equal(this.$('.detail-value').eq(idx).text().trim(), 'Done');
  idx += 1;
  assert.equal(this.$('.detail-label').eq(idx).text(), 'Delivery Email');
  assert.equal(this.$('.delivery-email').text().trim(), 'Subject: New DataEmail Body');
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
  assert.equal(this.$('.detail-label').eq(3).text(), 'Decline Reason');
  assert.equal(this.$('.detail-value').eq(3).text().trim(), 'Was not needed.');
  assert.equal(this.$('.detail-label').eq(4).text(), 'Performed By');
  assert.equal(this.$('.detail-value').eq(4).text().trim(), 'John Doe');
});

test('it renders email when transfer is pending', function(assert) {
  const transfer = Ember.Object.create({
    id: 5,
    isPending: true,
    project: {name: 'Taco'},
    fromUser: {fullName: 'Arthur Adamson'},
    toUsersNames: [ 'Zelda Zellington' ],
    status: 'pending',
    delivery: Ember.Object.create({
      deliveryEmailText: 'Subject: Hello\n\nEmail Body',
      shareUsers: [
        {fullName: 'Bob Robertson'}
      ],
    })
  });
  this.set('transfer', transfer);
  this.render(hbs`{{delivery-detail transfer}}`);
  assert.equal(this.$('.delivery-email').html().trim(), 'Subject: Hello<br><br>Email Body<br>');
});

test('it does not render email when transfer is not pending', function(assert) {
  const transfer = Ember.Object.create({
    id: 5,
    isPending: false,
    project: {name: 'Taco'},
    fromUser: {fullName: 'Arthur Adamson'},
    toUsersNames: [ 'Zelda Zellington' ],
    status: 'pending',
    delivery: Ember.Object.create({
      deliveryEmailText: 'Subject: Hello\n\nEmail Body',
      shareUsers: [
        {fullName: 'Bob Robertson'}
      ],
    })
  });
  this.set('transfer', transfer);
  this.render(hbs`{{delivery-detail transfer}}`);
  assert.equal(this.$('.delivery-email').html(), null);
});
