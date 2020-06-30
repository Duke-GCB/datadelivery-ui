import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';

module('Integration | Component | email-template-set-detail', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    const model = EmberObject.create({
      emailTemplates: [EmberObject.create({
        userType: 'delivery',
        helpText: 'help info',
        content: 'Testing\nTesting\nTesting'
      })]
    });
    this.set('model', model);

    await render(hbs`{{email-template-set-detail model=model}}`);

    assert.equal(find('.email-template-detail-type').innerHTML, 'delivery - Email Template');
    assert.equal(find('.email-template-detail-help').innerHTML, 'help info');
  });
});
