import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('project-updated-date', 'Integration | Component | project updated date', {
  integration: true
});

test('it renders', function(assert) {
  const record = Ember.Object.create({
    lastUpdatedOn: '2020-02-02'
  });
  this.set('record', record);
  this.render(hbs`{{project-updated-date record=record}}`);
  assert.equal(this.$().text().trim(), 'February 2, 2020 12:00 AM');

});
