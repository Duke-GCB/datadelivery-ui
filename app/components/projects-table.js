import Ember from 'ember';

const ProjectColumns = [
  { propertyName: "name",
    title: "Project Name",
    routeName: "duke-ds-projects.show",
    sortPrecedence: 3},
  { propertyName: "createdOn",
    title: "Created",
    component: "project-created-date",
    sortPrecedence: 2},
  { propertyName: "lastUpdatedOn",
    title: "Last Updated",
    component: "project-updated-date",
    sortPrecedence: 1}
];

export default Ember.Component.extend({
  classNames: ['projects-table'],
  projects: null,
  columns: null,
  init() {
    this._super(...arguments);
    this.set('columns', ProjectColumns);
  }
});
