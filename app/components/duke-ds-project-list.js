import Ember from 'ember';

const DukeDSProjectList = Ember.Component.extend({
  projects: null,
  selectionChanged: null, /** action */
  columns: [
    { propertyName: "name", title: "Project Name"}
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
