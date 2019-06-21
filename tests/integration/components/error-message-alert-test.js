import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | error message alert', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.set('errorMessages', ['Message one', 'Message two'])
    await render(hbs`{{error-message-alert errorMessages}}`);

    assert.equal(find('.error-message-alert-detail').textContent.trim(), 'Error: Message one Error: Message two');

    // Template block usage:
    await render(hbs`
      {{#error-message-alert}}
        Some Extra text
      {{/error-message-alert}}
    `);

    assert.equal(find('*').textContent.trim(), 'Some Extra text');
  });
});
