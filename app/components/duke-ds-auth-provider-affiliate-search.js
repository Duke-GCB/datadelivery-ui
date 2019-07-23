import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  classNames: ['duke-ds-auth-provider-affiliate-search'],
  store: service(),
  excludeUser: null,
  affiliates: null,
  filteredAffiliates: computed('affiliates', 'excludeUser', function() {
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
    if(!this.get('affiliates')) {
      this.set('affiliates', []);
    }
    this.set('selectedAffiliates', []);
  }
});
