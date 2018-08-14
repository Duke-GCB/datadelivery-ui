import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('select-row-checkbox', 'Integration | Component | select row checkbox', {
  integration: true
});

test('it renders with select-row class when selected', function(assert) {
  this.set('themeInstance', {
    'select-row': 'selectedClass',
    'deselect-row': 'unselectedClass',
  });
  this.render(hbs`{{select-row-checkbox isSelected=true themeInstance=themeInstance}}`);
  assert.equal(this.$('span').attr('class').trim(), 'selectedClass');
});

test('it renders with deselect-row class when unselected', function(assert) {
  this.set('themeInstance', {
    'select-row': 'selectedClass',
    'deselect-row': 'unselectedClass',
  });
  this.render(hbs`{{select-row-checkbox isSelected=false themeInstance=themeInstance}}`);
  assert.equal(this.$('span').attr('class').trim(), 'unselectedClass');
});

test('when span clicked passes index', function(assert) {
  assert.expect(1);
  this.set('externalAction', (index) => assert.equal(index, 123));
  this.render(hbs`{{select-row-checkbox index=123 clickOnRow=(action externalAction)}}`);
  this.$('span').click();
});
