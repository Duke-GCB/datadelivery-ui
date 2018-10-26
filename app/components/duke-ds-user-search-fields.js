import Ember from 'ember';

const MODES = [
  {mode: 'name', name: 'Name'},
  {mode: 'username', name: 'NetID'},
  {mode: 'email', name: 'Email'}
];

const DEFAULT_MODE = MODES[0];

export default Ember.Component.extend({
  query: null,
  modes: MODES,
  mode: null,
  onSearch: () => {}, // Default implementation
  actions: {
    search() {
      const query = this.get('query');
      const mode = this.get('mode');
      this.get('onSearch')(mode, query);
    }
  },
  didReceiveAttrs() {
    this._super(...arguments);
    this.set('mode', DEFAULT_MODE.mode);

  }
});
