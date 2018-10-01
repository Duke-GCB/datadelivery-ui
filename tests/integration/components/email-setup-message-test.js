import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('email-setup-message', 'Integration | Component | email setup message', {
  integration: true,
  setup() {
    this.container.lookup('router:main').setupRouter();
  }
});

test('it renders contact email address', function(assert) {
  this.render(hbs`{{email-setup-message contactEmail="help@help.com" emailSubject="Testing"}}`);
  assert.equal(this.$('a').text().trim(), 'help@help.com');

  this.render(hbs`
    {{#email-setup-message contactEmail="help@help.com" emailSubject="Testing"}}
      <span class="target">template block text</span>
    {{/email-setup-message}}
  `);
  assert.equal(this.$('a').text().trim(), 'help@help.com');
  assert.equal(this.$('.target').text().trim(), 'template block text');
});

test('it renders contact href', function(assert) {
  this.render(hbs`{{email-setup-message contactEmail="help@help.com" emailSubject="Testing this"}}`);
  assert.equal(this.$('a').attr('href').trim(), 'mailto:help@help.com?subject=Testing this');
});
