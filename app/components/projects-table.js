import Component from '@ember/component';

const ProjectColumns = [
  { propertyName: "name", title: "Project Name", routeName: "duke-ds-projects.show"},
  { propertyName: "createdOn", title: "Created"},
  { propertyName: "lastUpdatedOn", title: "Last Updated"}
];

export default Component.extend({
  classNames: ['projects-table'],
  projects: null,
  columns: null,
  init() {
    this._super(...arguments);
    this.set('columns', ProjectColumns);
  }
});
