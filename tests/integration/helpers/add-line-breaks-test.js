
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('helper:add-line-breaks', function(hooks) {
  setupRenderingTest(hooks);

  test('it replaces newlines with br tags', async function(assert) {
    this.set('inputValue', 'A\nB\nC');
    await render(hbs`{{add-line-breaks inputValue}}`);
    assert.equal(find('*').textContent.trim(), 'ABC');
    assert.equal(findAll('br').length, 2);
  });
});

