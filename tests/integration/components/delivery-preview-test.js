import { resolve, reject } from 'rsvp';
import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, fillIn } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | delivery preview', function(hooks) {
  setupRenderingTest(hooks);

  const DELIVERY_EMAIL_TEXT = 'Subject: Hello World';
  test('it generates preview when rendered, showing delivery_email_text from delivery.preview()', async function(assert) {
    assert.expect(5);
    const delivery = EmberObject.create({
      isLoaded: true,
      preview() {
        assert.step('preview');
        return resolve({delivery_email_text: DELIVERY_EMAIL_TEXT});
      }
    });
    this.set('delivery', delivery);
    assert.step('start');
    await render(hbs`{{delivery-preview delivery=delivery}}`);
    assert.step('end');
    assert.equal(find('.delivery-email').textContent.trim(), DELIVERY_EMAIL_TEXT);
    assert.verifySteps(['start','preview','end']);
  });

  test('it shows "Generating Preview" while loading', async function(assert) {
    this.set('mockGeneratePreview', ()=>{}); // Override generatePreview so that preview is never loaded
    await render(hbs`{{delivery-preview generatePreview=mockGeneratePreview}}`);
    assert.equal(find('.loading-message').textContent.trim(), 'Generating Preview');
  });

  test('it calls onFail when preview() fails', async function (assert) {
    const mockError = {detail: 'Preview Failed'};
    const delivery = EmberObject.create({
      isLoaded: true,
      preview() {
        assert.step('preview');
        return reject(mockError);
      }
    });
    // This component does not render errors, it calls an error handler
    const onFail = (error) => { assert.equal(error, mockError) };
    this.set('delivery', delivery);
    this.set('onFail', onFail);
    assert.step('start');
    await render(hbs`{{delivery-preview delivery=delivery onFail=onFail}}`);
    assert.step('end');
    assert.verifySteps(['start','preview','end']);
  });

  test('it generates preview when onChangeEmailTemplateSet is fired', async function(assert) {
    const selectedSet = EmberObject.create({id: '123', name: 'Set1'});
    this.set('emailTemplateSets', [
      selectedSet,
      EmberObject.create({id: '456', name: 'Set2'}),
    ]);
    const delivery = EmberObject.create({
      emailTemplateSet: selectedSet,
      isLoaded: true,
      preview() {
        assert.step('preview');
        return resolve({delivery_email_text: DELIVERY_EMAIL_TEXT});
      }
    });
    this.set('delivery', delivery);
    await render(hbs`{{delivery-preview delivery=delivery emailTemplateSets=emailTemplateSets}}`);
    await fillIn('.select-email-template-set', '456');
    assert.verifySteps([
      "preview",
      "preview"
    ]);
  });
});
