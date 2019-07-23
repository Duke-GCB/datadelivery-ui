import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | email setup message', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.setup = function() {
      this.owner.lookup('router:main').setupRouter();
    };
  });

  test('it renders contact email address', async function(assert) {
    await render(hbs`{{email-setup-message contactEmail="help@help.com" emailSubject="Testing"}}`);
    assert.equal(find('a').textContent.trim(), 'help@help.com');

    await render(hbs`
      {{#email-setup-message contactEmail="help@help.com" emailSubject="Testing"}}
        <span class="target">template block text</span>
      {{/email-setup-message}}
    `);
    assert.equal(find('a').textContent.trim(), 'help@help.com');
    assert.equal(find('.target').textContent.trim(), 'template block text');
  });

  test('it renders contact href', async function(assert) {
    await render(hbs`{{email-setup-message contactEmail="help@help.com" emailSubject="Testing this"}}`);
    assert.equal(find('a').getAttribute('href').trim(), 'mailto:help@help.com?subject=Testing this');
  });
});
