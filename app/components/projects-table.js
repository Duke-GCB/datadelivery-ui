import Component from '@ember/component';

const ProjectColumns = [
  { propertyName: "name",
    title: "Project Name",
    filterPlaceholder: 'Filter by project name',
    routeName: "duke-ds-projects.show",
    sortPrecedence: 3},
  { propertyName: "createdOn",
    title: "Created",
    filterPlaceholder: "Filter by date created",
    component: "project-created-date",
    sortPrecedence: 2},
  { propertyName: "lastUpdatedOn",
    title: "Last Updated",
    filterPlaceholder: "Filter by date updated",
    component: "project-updated-date",
    sortPrecedence: 1}
];

export default Component.extend({
  classNames: ['projects-table'],
  projects: null,
  columns: null,
  init() {
    this._super(...arguments);
    this.columns = ProjectColumns;
  }
});
