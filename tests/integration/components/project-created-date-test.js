import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import EmberObject from '@ember/object';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | project created date', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders a breadcrumb-item for each crumb with label, routeName, and links non-selected', async function(assert) {
    const record = EmberObject.create({
      createdOn: '2020-01-01'
    });
    this.set('record', record);
    await render(hbs`{{project-created-date record=record}}`);
    assert.equal(this.element.textContent.trim(), 'January 1, 2020 12:00 AM');
  });
});
