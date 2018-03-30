import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('error-message-alert', 'Integration | Component | error message alert', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.set('errorMessages', ['Message one', 'Message two'])
  this.render(hbs`{{error-message-alert errorMessages}}`);

  assert.equal(this.$('.error-message-alert-detail').text().trim(), 'Error: Message one Error: Message two');

  // Template block usage:
  this.render(hbs`
    {{#error-message-alert}}
      Some Extra text
    {{/error-message-alert}}
  `);

  assert.equal(this.$().text().trim(), 'Some Extra text');
});
