import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('delivery-table-row', 'Integration | Component | delivery table row', {
  integration: true
});

test('it renders', function(assert) {

  const delivery = Ember.Object.create({
    id: 3,
    project: {name: 'Taco'},
    fromUser: {fullName: 'Arthur Adamson'},
    toUser: { fullName: 'Zelda Zellington'},
    state: 'Done',
    transferId: 5
  });
  this.set('delivery', delivery);
  this.render(hbs`{{delivery-table-row delivery}}`);

  assert.equal(this.$('.delivery-table-row').text().trim(), '3\nTaco\nArthur Adamson\nZelda Zellington\nDone\n5');
});
