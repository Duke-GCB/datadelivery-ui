import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | number-to-human-size', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders 1 Kib', async function(assert) {
    this.set('inputValue', 1024);

    await render(hbs`{{number-to-human-size inputValue}}`);

    assert.equal(this.element.textContent.trim(), '1 KiB');
  });

  test('it renders 20 Mib', async function(assert) {
    this.set('inputValue', 20*1024*1024);

    await render(hbs`{{number-to-human-size inputValue}}`);

    assert.equal(this.element.textContent.trim(), '20 MiB');
  });

  test('it renders 3 Gib', async function(assert) {
    this.set('inputValue', 3*1024*1024*1024);

    await render(hbs`{{number-to-human-size inputValue}}`);

    assert.equal(this.element.textContent.trim(), '3 GiB');
  });
});
