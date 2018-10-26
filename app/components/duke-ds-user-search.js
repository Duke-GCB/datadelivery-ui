import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['duke-ds-user-search'],
  users: null,
  actions: {
    doSearch(args) {
      Ember.Logger.log(`Do the search ${args}`);
      this.get('users').addObject(args);
    }
  },

  didReceiveAttrs() {
    this._super(...arguments);
    this.set('users', []);

  }

});
