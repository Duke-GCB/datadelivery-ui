import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  classNames: ['duke-ds-auth-provider-affiliate-search'],
  store: service(),
  excludeUsers: null,
  affiliates: null,
  filteredAffiliates: computed('affiliates', 'excludeUsers.[]', function() {
    const excludeUsers = this.excludeUsers;
    var skipUserNames = [''];
    if (excludeUsers) {
      skipUserNames = skipUserNames.concat(excludeUsers.getEach('username'));
    }
    return this.affiliates
      .rejectBy('fullName', null)
      .rejectBy('fullName', '(null)')
      .rejectBy('email', null)
      .reject(affiliate => skipUserNames.includes(affiliate.uid));
  }),
  selectedAffiliates: null,
  onAffiliateSelected: () => {}, // Default implementation
  actions: {
    doSearch(params) {
      this.clearSelectedAffiliates();
      const store = this.store;
      store.query('duke-ds-auth-provider-affiliate', params).then(affiliates => {
        this.set('affiliates', affiliates);
      });
    },
    selectionChanged(selectedAffiliates) {
      if(selectedAffiliates.get('length') == 0) {
        this.onAffiliateSelected(null);
      } else {
        // Obtain the duke-ds-user from this affiliate
        const affiliate = selectedAffiliates.get('firstObject');
        affiliate.getOrRegisterUser().then(dukeDsUser => {
          this.onAffiliateSelected(dukeDsUser);
        });
      }
    }
  },
  clearSelectedAffiliates() {
    this.set('selectedAffiliates', []);
  },

  didReceiveAttrs() {
    this._super(...arguments);
    if(!this.affiliates) {
      this.set('affiliates', []);
    }
    this.set('selectedAffiliates', []);
  }
});
