import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | breadcrumb item', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders without link when selected', async function(assert) {
    await render(hbs`{{breadcrumb-item label="All" routeName="item.index" selectedRouteName="item.index"}}`);
    assert.equal(find('.breadcrumb-item').textContent.trim(), 'All');
    assert.equal(findAll('.breadcrumb-item a').length, 0);
  });

  test('it renders without link when not selected', async function(assert) {
    await render(hbs`{{breadcrumb-item label="SomeItem" routeName="item.show" selectedRouteName="item.index"}}`);
    assert.equal(find('*').textContent.trim(), 'SomeItem');
    assert.equal(findAll('a').length, 1);
    assert.equal(find('a').textContent.trim(), 'SomeItem');
  });

  test('it renders with context without link when not selected', async function(assert) {
    const delivery = EmberObject.create({
      id: 3,
    });
    this.set('delivery', delivery);
    await render(hbs`{{breadcrumb-item label="SomeItem"
                                      routeName="item.show"
                                      context=delivery
                                      selectedRouteName="item.index"}}`);
    assert.equal(find('*').textContent.trim(), 'SomeItem');
    assert.equal(findAll('a').length, 1);
    assert.equal(find('a').textContent.trim(), 'SomeItem');
  });
});
