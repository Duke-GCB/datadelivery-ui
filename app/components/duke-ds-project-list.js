import { observer } from '@ember/object';
import Component from '@ember/component';

const DukeDSProjectList = Component.extend({
  projects: null,
  selectionChanged: null, /** action */
  selectedItems: null,
  selectionDidChange: observer('selectedItems.[]', function() {
    // When unchecking the single item, selectedItems.length drops to 0,
    // but selectedItems.firstObject still references the old project
    const selectedItems = this.get('selectedItems');
    if(selectedItems.get('length') == 0) {
      this.selectionChanged(null);
    } else {
      this.selectionChanged(selectedItems.get('firstObject'))
    }
  }),
  init() {
    this._super(...arguments);
    this.set('selectedItems', []);
    this.columns = [
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
    ];
  }
});

DukeDSProjectList.reopenClass({
  positionalParams: ['projects']
});

export default DukeDSProjectList;
