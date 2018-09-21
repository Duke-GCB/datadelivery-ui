import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('email-setup-warning', 'Integration | Component | email setup warning', {
  integration: true
});

test('it renders contact email address', function(assert) {

  this.render(hbs`{{email-setup-warning contactEmail="help@help.com"}}`);
  assert.equal(this.$('a').text().trim(), 'help@help.com');

  this.render(hbs`
    {{#email-setup-warning contactEmail="help@help.com"}}
      <span class="target">template block text</span>
    {{/email-setup-warning}}
  `);
  assert.equal(this.$('a').text().trim(), 'help@help.com');
  assert.equal(this.$('.target').text().trim(), 'template block text');
});
