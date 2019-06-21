import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | projects table', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.setup = function() {
      this.owner.lookup('router:main').setupRouter();
    };
  });

  const Projects = [
    EmberObject.create({name: 'Project 1', id: 1, createdOn: '2001-01-01', lastUpdatedOn: '2011-11-11'}),
    EmberObject.create({name: 'Project 2', id: 2, createdOn: '2002-02-02', lastUpdatedOn: '2012-12-12'})
  ];

  test('it renders table', async function(assert) {
    this.set('projects', Projects);
    await render(hbs`{{projects-table projects=projects}}`);
    assert.equal(findAll('.projects-table tbody tr').length, 2);
    assert.equal(find('.projects-table tbody tr:eq(0) td').textContent.trim(), 'Project 1');
    assert.equal(find(findAll('.projects-table tbody tr:eq(0) td')[1]).textContent.trim(), '2001-01-01');
    assert.equal(find(findAll('.projects-table tbody tr:eq(0) td')[2]).textContent.trim(), '2011-11-11');
    assert.equal(find('.projects-table tbody tr:eq(1) td').textContent.trim(), 'Project 2');
    assert.equal(find(findAll('.projects-table tbody tr:eq(1) td')[1]).textContent.trim(), '2002-02-02');
    assert.equal(find(findAll('.projects-table tbody tr:eq(1) td')[2]).textContent.trim(), '2012-12-12');
  });

  test('it renders links to projects', async function(assert) {
    this.set('projects', Projects);
    await render(hbs`{{projects-table projects=projects}}`);
    assert.equal(find('.projects-table tbody tr:eq(0) a').getAttribute('href'), '/duke-ds-projects/1');
    assert.equal(find('.projects-table tbody tr:eq(1) a').getAttribute('href'), '/duke-ds-projects/2');
  });
});
