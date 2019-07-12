import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('project-detail', 'Integration | Component | project detail', {
  integration: true
});

test('it renders and fetches project summary', function(assert) {
  const ddsProject = Ember.Object.create({
    id: 123,
    name: 'Project ABC',
    isLoaded: true,
    getSummary() {
      assert.step('getSummary');
      return Ember.RSVP.resolve({});
    }
  });
  this.set('ddsProject', ddsProject);
  assert.step('before-render');
  this.render(hbs`{{project-detail ddsProject}}`);
  assert.step('after-render');
  assert.equal(this.$('.duke-ds-project-size').length, 1);
  assert.equal(this.$('.duke-ds-project-link').length, 1);
  assert.equal(this.$('.duke-ds-project-zip-download-link').length, 1);
  assert.verifySteps(['before-render','getSummary', 'after-render']);
});
