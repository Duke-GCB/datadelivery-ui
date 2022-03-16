import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';


module('Integration | Component | incoming-cloud-deliveries', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    const model = [];
    this.set('model', model);
    await render(hbs`{{incoming-cloud-deliveries model=model}}`);

    //assert.equal(this.elementHook)
    const thAry = findAll('th');
    assert.equal(thAry.length, 6);
    assert.equal(thAry[0].textContent.trim(), "Project Name");
    assert.equal(thAry[1].textContent.trim(), "From");
    assert.equal(thAry[2].textContent.trim(), "State");
    // Filter labels
    assert.equal(thAry[3].querySelector("label").textContent, "Project Name");
    assert.equal(thAry[4].querySelector("label").textContent.trim(), "From");
    assert.equal(thAry[5].querySelector("label").textContent.trim(), "State");
  });
});
