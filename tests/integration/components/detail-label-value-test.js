import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('detail-label-value', 'Integration | Component | detail label value', {
  integration: true
});

test('it renders a label and value', function(assert) {
  this.render(hbs`{{#detail-label-value label="MyData:"}}myValue{{/detail-label-value}}`);
  assert.equal(this.$('.detail-label').text().trim(), 'MyData:');
  assert.equal(this.$('.detail-value').text().trim(), 'myValue');
});
