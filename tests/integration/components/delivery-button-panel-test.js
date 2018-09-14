import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('delivery-button-panel', 'Integration | Component | delivery button panel', {
  integration: true,
  setup() {
    this.container.lookup('router:main').setupRouter();
  }
});

test('it shows buttons when showPendingActions is true', function(assert) {
  this.set('transfer', Ember.Object.create({
    id: '123'
  }));
  this.render(hbs`{{delivery-button-panel transfer=transfer showPendingActions=true}}`);
  assert.equal(this.$('a').eq(0).text(), 'Resend Delivery Email');
  assert.equal(this.$('a').eq(0).attr('href'), '/deliveries/123/resend');
  assert.equal(this.$('a').eq(1).text(), 'Recall Delivery');
  assert.equal(this.$('a').eq(1).attr('href'), '/deliveries/123/recall');
});

test('it shows no buttons when showPendingActions is false', function(assert) {
  this.render(hbs`{{delivery-button-panel showPendingActions=false}}`);
  assert.equal(this.$('a').text(), '');
});
