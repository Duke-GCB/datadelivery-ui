import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';


module('Integration | Component | delivery breadcrumbs', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders a breadcrumb-item for each crumb with label, routeName, and links non-selected', async function(assert) {
    this.owner.setupRouter();
    const mockStore = EmberObject.create({ currentRouteName: 'deliveries' });
    this.set('mockStore', mockStore);
    await render(hbs`{{delivery-breadcrumbs router=mockStore}}`);
    assert.equal(this.element.querySelectorAll('.breadcrumb-item').length, 2);
    assert.equal(this.element.querySelectorAll('.breadcrumb-item')[0].textContent.trim(), 'Home');
    assert.equal(this.element.querySelectorAll('.breadcrumb-item')[1].textContent.trim(), 'Deliveries');
    assert.equal(this.element.querySelectorAll('.breadcrumb-item a').length, 1);
    assert.equal(this.element.querySelector('.breadcrumb-item a').textContent.trim(), 'Home');
    assert.equal(this.element.querySelector('.breadcrumb-item a').getAttribute('href'), '/');
  });
});
