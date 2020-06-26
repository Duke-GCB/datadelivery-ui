import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | email-templates-help', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{email-templates-help}}`);

    assert.equal(this.element.textContent.trim(),
      'To request changes to your email templates please contact gcb-help@duke.edu.');
  });
});
