import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | select row checkbox', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders with select-row class when selected', async function(assert) {
    this.set('themeInstance', {
      'select-row': 'selectedClass',
      'deselect-row': 'unselectedClass',
    });
    await render(hbs`{{select-row-checkbox isSelected=true themeInstance=themeInstance}}`);
    assert.equal(find('span').getAttribute('class').trim(), 'selectedClass');
  });

  test('it renders with deselect-row class when unselected', async function(assert) {
    this.set('themeInstance', {
      'select-row': 'selectedClass',
      'deselect-row': 'unselectedClass',
    });
    await render(hbs`{{select-row-checkbox isSelected=false themeInstance=themeInstance}}`);
    assert.equal(find('span').getAttribute('class').trim(), 'unselectedClass');
  });

  test('when span clicked passes index', async function(assert) {
    assert.expect(1);
    this.set('externalAction', (index) => assert.equal(index, 123));
    await render(hbs`{{select-row-checkbox index=123 clickOnRow=(action externalAction)}}`);
    await click('span');
  });
});
