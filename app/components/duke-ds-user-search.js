import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['duke-ds-user-search'],
  users: null,
  actions: {
    doSearch(mode, query) {
      Ember.Logger.log();
      this.get('users').addObject(`${mode} ${query}`);
    }
  },

  didReceiveAttrs() {
    this._super(...arguments);
    this.set('users', []);
  }
});
