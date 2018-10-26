import Ember from 'ember';

const KINDS = [
  {mode: 'name', name: 'Name', placeholder: 'Person\'s Name'},
  {mode: 'username', name: 'NetID', placeholder: 'Duke NetID'},
  {mode: 'email', name: 'Email', placeholder: 'Email Address'}
];

const DEFAULT_KIND = KINDS[0];

export default Ember.Component.extend({
  query: null,
  kinds: KINDS,
  kind: null,
  onSearch: () => {}, // Default implementation
  actions: {
    search() {
      const query = this.get('query');
      const mode = this.get('kind.mode');
      this.get('onSearch')(mode, query);
    }
  },
  didReceiveAttrs() {
    this._super(...arguments);
    this.set('kind', DEFAULT_KIND);

  }
});
