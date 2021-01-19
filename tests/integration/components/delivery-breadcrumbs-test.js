import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import $ from 'jquery';


module('Integration | Component | delivery breadcrumbs', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders a breadcrumb-item for each crumb with label, routeName, and links non-selected', async function(assert) {
    this.owner.setupRouter();
    const mockStore = EmberObject.create({ currentRouteName: 'deliveries' });
    this.set('mockStore', mockStore);
    await render(hbs`{{delivery-breadcrumbs router=mockStore}}`);
    assert.equal($('.breadcrumb-item').length, 2);
    assert.equal($('.breadcrumb-item:eq(0)').text().trim(), 'Home');
    assert.equal($('.breadcrumb-item:eq(1)').text().trim(), 'Deliveries');
    assert.equal($('.breadcrumb-item a').length, 1);
    assert.equal($('.breadcrumb-item a').text().trim(), 'Home');
    assert.equal($('.breadcrumb-item a').attr('href'), '/');
  });
});
