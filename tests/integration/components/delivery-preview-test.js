import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('delivery-preview', 'Integration | Component | delivery preview', {
  integration: true
});

const DELIVERY_EMAIL_TEXT = 'Subject: Hello World';

test('it generates preview when rendered, showing delivery_email_text from delivery.preview()', function(assert) {
  assert.expect(5);
  const delivery = Ember.Object.create({
    isLoaded: true,
    preview() {
      assert.step('preview');
      return Ember.RSVP.resolve({delivery_email_text: DELIVERY_EMAIL_TEXT});
    }
  });
  Ember.run(() => {
    this.set('delivery', delivery);
    assert.step('start');
    this.render(hbs`{{delivery-preview delivery=delivery}}`);
    assert.step('end');
  });
  assert.equal(this.$().text().trim(), DELIVERY_EMAIL_TEXT);
  assert.verifySteps(['start','preview','end']);
});

test('it shows "Generating Preview" while loading', function (assert) {
  this.set('mockGeneratePreview', ()=>{}); // Override generatePreview so that preview is never loaded
  this.render(hbs`{{delivery-preview generatePreview=mockGeneratePreview}}`);
  assert.equal(this.$().text().trim(), 'Generating Preview');
});

test('it calls onFail when preview() fails', function (assert) {
  const mockError = {detail: 'Preview Failed'};
  const delivery = Ember.Object.create({
    isLoaded: true,
    preview() {
      assert.step('preview');
      return Ember.RSVP.reject(mockError);
    }
  });
  // This component does not render errors, it calls an error handler
  const onFail = (error) => { assert.equal(error, mockError) };
  Ember.run(() => {
    this.set('delivery', delivery);
    this.set('onFail', onFail);
    assert.step('start');
    this.render(hbs`{{delivery-preview delivery=delivery onFail=onFail}}`);
    assert.step('end');
  });
  assert.verifySteps(['start','preview','end']);
});
