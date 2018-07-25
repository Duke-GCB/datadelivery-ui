import Ember from 'ember';

const DukeDSUserList = Ember.Component.extend({
  users: null,
  multipleSelect: false,
  pageSize: 12,
  selectionChanged: null, /** action */
  columns: [
    {
      component: "select-row-checkbox",
      useFilter: false,
      mayBeHidden: false,
      className: "select-row-checkbox-column",
    },
    { propertyName: "fullName", title: "Name"},
    { propertyName: "email", title: "Email"}
  ],
  actions: {
    displayDataChanged: function (e) {
      this.get('selectionChanged')(e);
    }
  }
});

DukeDSUserList.reopenClass({
  positionalParams: ['users']
});

export default DukeDSUserList;
