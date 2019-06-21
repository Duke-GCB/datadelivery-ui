import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | delivery button panel', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.setup = function() {
      this.owner.lookup('router:main').setupRouter();
    };
  });

  test('it shows buttons when showPendingActions is true', async function(assert) {
    this.set('transfer', EmberObject.create({
      id: '123'
    }));
    await render(hbs`{{delivery-button-panel transfer=transfer showPendingActions=true}}`);
    assert.equal(this.$('a').eq(0).text(), 'Resend Delivery Email');
    assert.equal(this.$('a').eq(0).attr('href'), '/deliveries/123/resend');
    assert.equal(this.$('a').eq(1).text(), 'Recall Delivery');
    assert.equal(this.$('a').eq(1).attr('href'), '/deliveries/123/recall');
  });

  test('it shows no buttons when showPendingActions is false', async function(assert) {
    await render(hbs`{{delivery-button-panel showPendingActions=false}}`);
    assert.equal(find('a').textContent, '');
  });
});
