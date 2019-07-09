import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('projects-table', 'Integration | Component | projects table', {
  integration: true,
  setup() {
    this.container.lookup('router:main').setupRouter();
  }
});

const Projects = [
  Ember.Object.create({name: 'Project 1', id: 1, createdOn: '2001-01-01', lastUpdatedOn: '2011-11-11'}),
  Ember.Object.create({name: 'Project 2', id: 2, createdOn: '2002-02-02', lastUpdatedOn: '2012-12-12'})
];

test('it renders table', function(assert) {
  this.set('projects', Projects);
  this.render(hbs`{{projects-table projects=projects}}`);
  assert.equal(this.$('.projects-table tbody tr').length, 2);
  assert.equal(this.$('.projects-table tbody tr:eq(0) td:eq(0)').text().trim(), 'Project 1');
  assert.equal(this.$('.projects-table tbody tr:eq(0) td:eq(1)').text().trim(), 'January 1, 2001 12:00 AM');
  assert.equal(this.$('.projects-table tbody tr:eq(0) td:eq(2)').text().trim(), 'November 11, 2011 12:00 AM');
  assert.equal(this.$('.projects-table tbody tr:eq(1) td:eq(0)').text().trim(), 'Project 2');
  assert.equal(this.$('.projects-table tbody tr:eq(1) td:eq(1)').text().trim(), 'February 2, 2002 12:00 AM');
  assert.equal(this.$('.projects-table tbody tr:eq(1) td:eq(2)').text().trim(), 'December 12, 2012 12:00 AM');
});

test('it renders links to projects', function(assert) {
  this.set('projects', Projects);
  this.render(hbs`{{projects-table projects=projects}}`);
  assert.equal(this.$('.projects-table tbody tr:eq(0) a').attr('href'), '/duke-ds-projects/1');
  assert.equal(this.$('.projects-table tbody tr:eq(1) a').attr('href'), '/duke-ds-projects/2');
});
