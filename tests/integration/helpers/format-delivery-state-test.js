
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('format-delivery-state', 'helper:format-delivery-state', {
  integration: true
});

test('it renders', function(assert) {
  this.set('inputValue', 'accepted');
  this.render(hbs`{{format-delivery-state inputValue}}`);

  assert.equal(this.$().text().trim(), 'Accepted');

  this.render(hbs`{{format-delivery-state}}`);
  assert.equal(this.$().text().trim(), '');
});

