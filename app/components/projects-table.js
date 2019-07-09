import Ember from 'ember';

const ProjectColumns = [
  { propertyName: "name", title: "Project Name", routeName: "duke-ds-projects.show" },
  { propertyName: "createdOn", title: "Created", component: "project-created-date" },
  { propertyName: "lastUpdatedOn", title: "Last Updated", component: "project-updated-date" }
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
