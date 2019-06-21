import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | delivery breadcrumbs', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.setup = function() {
      this.owner.lookup('router:main').setupRouter();
    };
  });

  test('it renders a breadcrumb-item for each crumb with label, routeName, and links non-selected', async function(assert) {
    this.owner.lookup('router:main').set('currentRouteName', 'deliveries');
    await render(hbs`{{delivery-breadcrumbs}}`);
    assert.equal(findAll('.breadcrumb-item').length, 2);
    assert.equal(find('.breadcrumb-item').textContent.trim(), 'Home');
    assert.equal(find(findAll('.breadcrumb-item')[1]).textContent.trim(), 'Deliveries');
    assert.equal(findAll('.breadcrumb-item a').length, 1);
    assert.equal(find('.breadcrumb-item a').textContent.trim(), 'Home');
    assert.equal(find('.breadcrumb-item a').getAttribute('href'), '/');
  });
});
