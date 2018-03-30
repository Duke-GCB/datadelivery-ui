import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('delivery-table-row', 'Integration | Component | delivery table row', {
  integration: true
});

test('it renders', function(assert) {

  const transfer = Ember.Object.create({
    id: 3,
    project: {name: 'Taco'},
    fromUser: {fullName: 'Arthur Adamson'},
    toUsers: [{ fullName: 'Zelda Zellington'}],
    status: 'pending'
  });
  this.set('transfer', transfer);
  this.render(hbs`{{delivery-table-row transfer}}`);
  assert.equal(this.$('td').eq(0).text().trim(), 'Taco');
  assert.equal(this.$('td').eq(1).text().trim(), 'Arthur Adamson');
  assert.equal(this.$('td').eq(2).text().trim(), 'Zelda Zellington');
  assert.equal(this.$('td').eq(3).text().trim(), 'pending');
  assert.equal(this.$('td').length, 4);
});
