import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | error message alert', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.set('errorMessages', ['Message one', 'Message two']);
    await render(hbs`{{error-message-alert errorMessages}}`);

    assert.equal(this.$('.error-message-alert-detail').text().trim(), 'Error: Message one Error: Message two');

    // Template block usage:
    await render(hbs`
      {{#error-message-alert}}
        Some Extra text
      {{/error-message-alert}}
    `);

    assert.equal(this.$().text().trim(), 'Some Extra text');
  });
});
