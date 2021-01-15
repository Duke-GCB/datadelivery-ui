import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import $ from 'jquery';

module('Integration | Component | zip download info', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders a panel with panel-warning class', async function(assert) {
    await render(hbs`{{zip-download-info}}`);
    assert.equal($('.zip-download-info .panel-warning').length, 1);
  });

  test('it renders link to support email', async function (assert) {
    this.set('supportEmail', 'help@example.org');
    await render(hbs`{{zip-download-info supportEmail=supportEmail}}`);
    assert.equal($('.zip-download-info a').attr('href'), 'mailto:help@example.org');
    assert.equal($('.zip-download-info a').text(), 'help@example.org');
  });

});
