import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | project updated date', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    const record = EmberObject.create({
      lastUpdatedOn: '2020-02-02'
    });
    this.set('record', record);
    await render(hbs`{{project-updated-date record=record}}`);
    assert.equal(this.$().text().trim(), 'February 2, 2020 12:00 AM');
  });

});
