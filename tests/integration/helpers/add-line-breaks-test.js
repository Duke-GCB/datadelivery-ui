
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('add-line-breaks', 'helper:add-line-breaks', {
  integration: true
});

test('it replaces newlines with br tags', function(assert) {
  this.set('inputValue', 'A\n\B\nC');
  this.render(hbs`{{add-line-breaks inputValue}}`);
  assert.equal(this.$().text().trim(), 'ABC');
  assert.equal(this.$('br').length, 2);
});

