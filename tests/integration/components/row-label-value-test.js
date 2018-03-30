import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('row-label-value', 'Integration | Component | row label value', {
  integration: true
});

test('it renders a label and value', function(assert) {
  this.render(hbs`{{row-label-value label="MyData:" value="myValue"}}`);
  assert.equal(this.$('label').text().trim(), 'MyData:');
  assert.equal(this.$('div').eq(2).text().trim(), 'myValue');
});

test('it renders a label and value with custom class names', function(assert) {
  this.render(hbs`{{row-label-value label="MyData:"
                                    value="myValue"
                                    labelClassName='bold'
                                    valueClassName='wide' }}`);
  assert.equal(this.$('div').eq(1).attr('class'), 'bold');
  assert.equal(this.$('div').eq(2).attr('class'), 'wide');
});
