import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';


module('Integration | Component | user-info', function(hooks) {
  setupRenderingTest(hooks);

  test('it is blank when user is null', async function(assert) {
    this.set('user', null);
    await render(hbs`{{user-info user=user}}`);
    assert.equal(this.element.textContent.trim(), '');
  });

  test('it is blank when user is null', async function(assert) {
    this.set('user', EmberObject.create({
      first_name: "Joe",
      last_name: "Smith",
      username: "joe",
    }));
    await render(hbs`{{user-info user=user}}`);
    assert.equal(this.element.textContent.trim(), "Logged in as Joe Smith (joe)");
  });
});
