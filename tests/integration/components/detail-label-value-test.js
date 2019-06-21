import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | detail label value', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders a label and value', async function(assert) {
    await render(hbs`{{#detail-label-value label="MyData:"}}myValue{{/detail-label-value}}`);
    assert.equal(find('.detail-label').textContent.trim(), 'MyData:');
    assert.equal(find('.detail-value').textContent.trim(), 'myValue');
  });
});
