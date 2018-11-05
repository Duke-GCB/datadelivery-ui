import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['duke-ds-user-search'],
  store: Ember.inject.service(),
  users: null,
  selectedUsers: null,
  actions: {
    doSearch(params) {
      this.clearSelectedUsers();
      const store = this.get('store');
      store.query('duke-ds-user', params).then(users => {
        this.set('users', users);
      });
    },
    selectionChanged(selectedUser) {
      Ember.Logger.log(`User selected: ${Ember.inspect(selectedUser.get('username'))}`);
    }
  },
  clearSelectedUsers() {
    this.set('selectedUsers', []);
  },

  didReceiveAttrs() {
    this._super(...arguments);
    this.set('users', []);
    this.set('selectedUsers', []);
  }
});
