import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';

moduleForComponent('project-created-date', 'Integration | Component | project created date', {
  integration: true
});

test('it renders', function(assert) {
  const record = EmberObject.create({
    createdOn: '2020-01-01'
  });
  this.set('record', record);
  this.render(hbs`{{project-created-date record=record}}`);
  assert.equal(this.$().text().trim(), 'January 1, 2020 12:00 AM');
});
