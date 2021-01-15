import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import $ from 'jquery';

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
    assert.equal($('.projects-table tbody tr').length, 2);
    assert.equal($('.projects-table tbody tr:eq(0) td:eq(0)').text().trim(), 'Project 1');
    assert.equal($('.projects-table tbody tr:eq(0) td:eq(1)').text().trim(), 'January 1, 2001 12:00 AM');
    assert.equal($('.projects-table tbody tr:eq(0) td:eq(2)').text().trim(), 'November 11, 2011 12:00 AM');
    assert.equal($('.projects-table tbody tr:eq(1) td:eq(0)').text().trim(), 'Project 2');
    assert.equal($('.projects-table tbody tr:eq(1) td:eq(1)').text().trim(), 'February 2, 2002 12:00 AM');
    assert.equal($('.projects-table tbody tr:eq(1) td:eq(2)').text().trim(), 'December 12, 2012 12:00 AM');
  });

  test('it renders links to projects', async function(assert) {
    this.owner.lookup('router:main').startRouting(true);
    this.set('projects', Projects);
    await render(hbs`{{projects-table projects=projects}}`);
    assert.equal($('.projects-table tbody tr:eq(0) a').attr('href'), '/duke-ds-projects/1');
    assert.equal($('.projects-table tbody tr:eq(1) a').attr('href'), '/duke-ds-projects/2');
  });
});
