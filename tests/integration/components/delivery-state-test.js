import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | delivery state', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders the state', async function(assert) {
    // Handle any actions with this.on('myAction', function(val) { ... });
    const delivery = EmberObject.create({status: 'accepted'});
    this.set('delivery', delivery);
    await render(hbs`{{delivery-state record=delivery}}`);
    assert.equal(find('*').textContent.trim(), 'Accepted');
  });
});
