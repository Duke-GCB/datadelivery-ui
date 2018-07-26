import Ember from 'ember';

const DukeDSProjectList = Ember.Component.extend({
  projects: null,
  selectionChanged: null, /** action */
  columns: [
    {
      component: "select-row-checkbox",
      useFilter: false,
      mayBeHidden: false,
      className: "select-row-checkbox-column",
    },
    {
      propertyName: "name", title: "Project Name",
      className: "duke-ds-project-name"
    }
  ],
  actions: {
    displayDataChanged: function (e) {
      this.get('selectionChanged')(e);
    }
  }
});

DukeDSProjectList.reopenClass({
  positionalParams: ['projects']
});

export default DukeDSProjectList;
