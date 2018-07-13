import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('duke-ds-user-list', 'Integration | Component | duke ds user list', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{duke-ds-user-list}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#duke-ds-user-list}}
      template block text
    {{/duke-ds-user-list}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
