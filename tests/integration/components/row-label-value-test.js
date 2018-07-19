import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('row-label-value', 'Integration | Component | row label value', {
  integration: true
});

test('it renders a label and value', function(assert) {
  this.render(hbs`{{#row-label-value label="MyData:"}}myValue{{/row-label-value}}`);
  assert.equal(this.$('.detail-label').text().trim(), 'MyData:');
  assert.equal(this.$('.detail-value').text().trim(), 'myValue');
});
