import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll, fillIn } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';

module('Integration | Component | select-email-template-set', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('selected', EmberObject.create({id: '123', name: 'Set1'}));
    this.set('emailTemplateSets', [
      EmberObject.create({id: '123', name: 'Set1'}),
      EmberObject.create({id: '456', name: 'Set2'}),
    ]);
    await render(hbs`{{select-email-template-set 
        value=selected 
        emailTemplateSets=emailTemplateSets}}`);
    const options = findAll('.select-email-template-set option');
    assert.equal(options[0].value, '123');
    assert.equal(options[0].innerHTML, 'Set1');
    assert.equal(options[0].selected, true);
    assert.equal(options[1].value, '456');
    assert.equal(options[1].innerHTML, 'Set2');
    assert.equal(options[1].selected, false);
  });

  test('it handles onChange', async function(assert) {
    assert.expect(1);
    this.set('externalAction', (value) => assert.equal(value.name, 'Set2'));
    this.set('selected', EmberObject.create({id: '123', name: 'Set1'}));
    this.set('emailTemplateSets', [
      EmberObject.create({id: '123', name: 'Set1'}),
      EmberObject.create({id: '456', name: 'Set2'}),
    ]);
    await render(hbs`{{select-email-template-set 
        value=selected 
        emailTemplateSets=emailTemplateSets
        onChange=(action externalAction)
        }}`);
    fillIn('.select-email-template-set', '456');
  });
});
