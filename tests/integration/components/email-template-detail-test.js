import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';

module('Integration | Component | email-template-detail', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    const emailTemplate = EmberObject.create({
      userType: 'Delivery',
      helpText: 'Info about how delivery works.'
    });
    this.set('emailTemplate', emailTemplate);

    await render(hbs`{{email-template-detail model=emailTemplate}}`);

    assert.equal(find('.email-template-detail-type').innerHTML, 'Delivery - Email Template');
    assert.equal(find('.email-template-detail-help').innerHTML, 'Info about how delivery works.');
  });
});
