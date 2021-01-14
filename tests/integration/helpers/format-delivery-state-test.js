
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('helper:format-delivery-state', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('inputValue', 'accepted');
    await render(hbs`{{format-delivery-state inputValue}}`);

    assert.equal(find('*').textContent.trim(), 'Accepted');

    await render(hbs`{{format-delivery-state}}`);
    assert.equal(find('*').textContent.trim(), '');
  });
});

