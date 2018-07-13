import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('duke-ds-project-list', 'Integration | Component | duke ds project list', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{duke-ds-project-list}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#duke-ds-project-list}}
      template block text
    {{/duke-ds-project-list}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
