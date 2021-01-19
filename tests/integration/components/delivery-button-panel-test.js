import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | delivery button panel', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.setupRouter();
  });

  test('it shows buttons when showPendingActions is true', async function(assert) {
    this.set('transfer', EmberObject.create({
      id: '123'
    }));
    await render(hbs`{{delivery-button-panel transfer=transfer showPendingActions=true}}`);
    assert.equal(this.element.querySelectorAll('a')[0].textContent, 'Resend Delivery Email');
    assert.equal(this.element.querySelectorAll('a')[0].getAttribute('href'), '/deliveries/123/resend');
    assert.equal(this.element.querySelectorAll('a')[1].textContent, 'Recall Delivery');
    assert.equal(this.element.querySelectorAll('a')[1].getAttribute('href'), '/deliveries/123/recall');
  });

  test('it shows no buttons when showPendingActions is false', async function(assert) {
    await render(hbs`{{delivery-button-panel showPendingActions=false}}`);
    assert.equal(this.element.querySelectorAll('a').length, 0);
  });
});
