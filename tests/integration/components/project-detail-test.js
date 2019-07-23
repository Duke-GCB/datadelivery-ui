import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | project detail', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders and fetches project summary', async function(assert) {
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
    await  render(hbs`{{project-detail ddsProject}}`);
    assert.step('after-render');
    assert.equal(this.$('.duke-ds-project-size').length, 1);
    assert.equal(this.$('.duke-ds-project-link').length, 1);
    assert.equal(this.$('.duke-ds-project-zip-download-link').length, 1);
    assert.verifySteps(['before-render','getSummary', 'after-render']);
  });
});
