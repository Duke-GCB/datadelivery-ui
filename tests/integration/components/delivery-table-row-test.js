import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('delivery-table-row', 'Integration | Component | delivery table row', {
  integration: true
});

test('it renders', function(assert) {

  const delivery = Ember.Object.create({
    id: 3,
    transfer: {
      id: 5,
      project: {name: 'Taco'},
      fromUser: {fullName: 'Arthur Adamson'},
      toUsers: [{ fullName: 'Zelda Zellington'}],
      status: 'Done'
    },
    shareUsers: [
      {fullName: 'Bob Robertson'}
    ],
  });
  this.set('delivery', delivery);
  this.render(hbs`{{delivery-table-row delivery}}`);
  assert.equal(this.$('td').eq(0).text().trim(), '3');
  assert.equal(this.$('td').eq(1).text().trim(), 'Taco');
  assert.equal(this.$('td').eq(2).text().trim(), 'Arthur Adamson');
  assert.equal(this.$('td').eq(3).text().trim(), 'Zelda Zellington');
  assert.equal(this.$('td').eq(4).text().trim(), 'Bob Robertson');
  assert.equal(this.$('td').eq(5).text().trim(), 'Done');
  assert.equal(this.$('td').length, 6);
});
