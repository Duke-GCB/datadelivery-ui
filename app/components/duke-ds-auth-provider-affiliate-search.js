import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['duke-ds-auth-provider-affiliate-search'],
  store: Ember.inject.service(),
  excludeUser: null,
  affiliates: null,
  filteredAffiliates: Ember.computed('affiliates', 'excludeUser', function() {
    return this.get('affiliates')
      .rejectBy('fullName', null)
      .rejectBy('fullName', '(null)')
      .rejectBy('email', null)
      .rejectBy('uid', this.getWithDefault('excludeUser.username', ''));
  }),
  selectedAffiliates: null,
  onAffiliateSelected: () => {}, // Default implementation

  actions: {
    doSearch(params) {
      this.clearSelectedAffiliates();
      const store = this.get('store');
      store.query('duke-ds-auth-provider-affiliate', params).then(affiliates => {
        this.set('affiliates', affiliates);
      });
    },
    selectionChanged(selectedAffiliate) {
      this.get('onAffiliateSelected')(selectedAffiliate);
    }
  },
  clearSelectedAffiliates() {
    this.set('selectedAffiliates', []);
  },

  didReceiveAttrs() {
    this._super(...arguments);
    this.set('affiliates', []);
    this.set('selectedAffiliates', []);
  }
});
