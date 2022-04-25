import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import $ from 'jquery';

module('Integration | Component | cloud-delivery-detail', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders brief by default', async function (assert) {
    const model = EmberObject.create({
      id: 1,
      status: 'notified',
      isLoaded: true,
      getDeliverySummary: function () { return {}}
    });
    this.set('model', model);
    await render(hbs`{{cloud-delivery-detail model=model}}`);
    assert.equal($('.detail-label').eq(0).text(), 'From');
    assert.equal($('.detail-label').eq(1).text(), 'To');
    assert.equal($('.detail-label').eq(2).text(), 'Status');
    assert.equal($('.detail-label').eq(3).text(), 'Delivery Email');
    assert.equal(findAll('.detail-label').length, 4);
  });

  test('it renders project details', async function (assert) {
    const model = EmberObject.create({
      id: 1,
      status: 'notified',
      isLoaded: true,
      from_netid: {
        full_name: "Joe"
      },
      to_netid: {
        full_name: "Bob"
      },
      getDeliverySummary: function () { return {}}
    });
    this.set('model', model);
    await render(hbs`{{cloud-delivery-detail model=model showProjectDetails=true}}`);
    assert.equal($('.detail-label').eq(0).text(), 'From');
    assert.equal($('.detail-value').eq(0).text(), 'Joe');
    assert.equal($('.detail-label').eq(1).text(), 'To');
    assert.equal($('.detail-value').eq(1).text(), 'Bob');
    assert.equal($('.detail-label').eq(2).text(), 'Status');
    assert.equal($('.detail-value').eq(2).text().trim(), 'Notified');
    assert.equal($('.detail-label').eq(3).text(), 'Delivery Email');
    assert.equal($('.detail-label').eq(4).text(), 'Project Size');
    assert.equal($('.detail-label').eq(5).text(), 'Project URL');
    assert.equal(findAll('.detail-label').length, 6);
  });
});
