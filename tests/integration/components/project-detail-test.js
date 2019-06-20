import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('project-detail', 'Integration | Component | project detail', {
  integration: true
});

test('it renders', function(assert) {
  const project = Ember.Object.create({
    id: 123,
    name: 'Project ABC',
    isLoaded: true,
    getSummary() {}
  });

  this.set('project', project);
  this.render(hbs`{{project-detail project}}`);
  assert.equal(this.$('.duke-ds-project-size').length, 1);
  assert.equal(this.$('.duke-ds-project-link').length, 1);
  assert.equal(this.$('.duke-ds-project-zip-download-link').length, 1);
});
