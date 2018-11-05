import Ember from 'ember';

const KINDS = [
  {mode: 'full_name_contains', name: 'Name', placeholder: 'Full Name'},
  {mode: 'username', name: 'NetID', placeholder: 'Duke NetID'},
  {mode: 'email', name: 'Email', placeholder: 'Email Address'}
];

const DEFAULT_KIND = KINDS[0];

export default Ember.Component.extend({
  classNames: ['duke-ds-user-search-fields'],
  query: null,
  kinds: KINDS,
  kind: null,
  onSearch: () => {}, // Default implementation
  actions: {
    search() {
      let params = {};
      const query = this.get('query');
      const mode = this.get('kind.mode');
      Ember.set(params, mode, query);
      this.get('onSearch')(params);
    }
  },
  didReceiveAttrs() {
    this._super(...arguments);
    this.set('kind', DEFAULT_KIND);
  }
});
