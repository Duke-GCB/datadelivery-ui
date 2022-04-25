import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';

module('Integration | Component | email-template-set-table', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    const emailTemplates = [EmberObject.create({
      name: "rawdata",
      ccAddress: "bob@bob.bob",
      replyAddress: "joe@joe.joe",
      default: true,
      storageName: "Azure"
    })];
    this.set('emailTemplates', emailTemplates);
    await render(hbs`{{email-template-set-table model=emailTemplates}}`);

    assert.equal(findAll('td').length, 5);
    assert.equal(findAll('td')[1].innerHTML.trim(), "bob@bob.bob");
    assert.equal(findAll('td')[2].innerHTML.trim(), "joe@joe.joe");
    assert.equal(findAll('td')[3].innerHTML.trim(), "true");
    assert.equal(findAll('td')[4].innerHTML.trim(), "Azure");
  });
});
