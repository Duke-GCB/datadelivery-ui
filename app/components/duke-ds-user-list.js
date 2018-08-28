import Ember from 'ember';

const DukeDSUserList = Ember.Component.extend({
  users: null,
  multipleSelect: false,
  selectedItems: null,
  pageSize: 12,
  selectionChanged: null, /** action */
  columns: [
    {
      component: "select-row-checkbox",
      useFilter: false,
      mayBeHidden: false,
      className: "select-row-checkbox-column",
    },
    { propertyName: "fullName",
      title: "Name",
      className: "duke-ds-user-fullName",
    },
    { propertyName: "email",
      title: "Email",
      className: "duke-ds-user-email"}
  ],
  selectionDidChange: Ember.observer('selectedItems.[]', function() {
    this.selectionChanged(this.get('selectedItems'));
  }),
  init() {
    this._super(...arguments);
    this.set('selectedItems', []);
  }
});

DukeDSUserList.reopenClass({
  positionalParams: ['users']
});

export default DukeDSUserList;
