import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | user message textarea', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders value', async function(assert) {
    const delivery = EmberObject.create({
      id: 3,
      userMessage: 'some details'
    });
    this.set('delivery', delivery);
    await render(hbs`{{user-message-textarea value=delivery.userMessage readonly=true}}`);
    assert.equal(find('textarea').value, 'some details');
  });
});
