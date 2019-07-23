import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('zip-download-info', 'Integration | Component | zip download info', {
  integration: true
});

test('it renders a panel with panel-warning class', function(assert) {
  this.render(hbs`{{zip-download-info}}`);
  assert.equal(this.$('.zip-download-info .panel-warning').length, 1);
});

test('it renders link to support email', function (assert) {
  this.set('supportEmail', 'help@example.org');
  this.render(hbs`{{zip-download-info supportEmail=supportEmail}}`);
  assert.equal(this.$('.zip-download-info a').attr('href'), 'mailto:help@example.org');
  assert.equal(this.$('.zip-download-info a').text(), 'help@example.org');
});
