import Ember from 'ember';

const DukeDSProjectList = Ember.Component.extend({
  projects: null,
  selectionChanged: null, /** action */
  selectedItems: [], // TODO: Set in init
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
  selectionDidChange: Ember.observer('selectedItems.[]', function() {
    // When unchecking the single item, selectedItems.length drops to 0,
    // but selectedItems.firstObject still references the old project
    const selectedItems = this.get('selectedItems');
    if(selectedItems.get('length') == 0) {
      this.selectionChanged(null);
    } else {
      this.selectionChanged(selectedItems.get('firstObject'))
    }
  })
});

DukeDSProjectList.reopenClass({
  positionalParams: ['projects']
});

export default DukeDSProjectList;
