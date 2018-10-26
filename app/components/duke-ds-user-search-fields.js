import Ember from 'ember';

export default Ember.Component.extend({
  query: null,
  mode: 'username',
  onSearch: () => {}, // Default implementation
  actions: {
    search() {
      const query = this.get('query');
      const mode = this.get('mode');
      this.get('onSearch')(mode, query);
    }
  }
});
