import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['duke-ds-user-search'],
  store: Ember.inject.service(),
  users: null,
  actions: {
    doSearch(params) {
      const store = this.get('store');
      store.query('duke-ds-user', params).then(users => {
        this.set('users', users);
      });
    }
  },

  didReceiveAttrs() {
    this._super(...arguments);
    this.set('users', []);
  }
});
