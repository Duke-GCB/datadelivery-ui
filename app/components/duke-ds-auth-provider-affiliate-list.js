import { observer } from '@ember/object';
import Component from '@ember/component';

const DukeDSAuthProviderAffiliateList = Component.extend({
  classNames: ['duke-ds-auth-provider-affiliate-list'],
  affiliates: null,
  multipleSelect: false,
  selectedItems: null,
  pageSize: 12,
  selectionChanged: null, /** action */
  columns: [
    {
      component: "select-row-checkbox",
      useFilter: false,
      mayBeHidden: false,
      className: "select-row-checkbox-column",
    },
    { propertyName: "fullName",
      title: "Name",
      className: "duke-ds-auth-provider-affiliate-fullName",
      sortPrecedence: 0
    },
    { propertyName: "uid",
      title: "NetID",
      className: "duke-ds-auth-provider-affiliate-netid"
    },
    { propertyName: "email",
      title: "Email",
      className: "duke-ds-auth-provider-affiliate-email"}
  ],
  selectionDidChange: observer('selectedItems.[]', function() {
    if(this.get('selectionChanged')) {
      this.selectionChanged(this.get('selectedItems'));
    }
  }),
  init() {
    this._super(...arguments);
    this.set('selectedItems', []);
  }
});

DukeDSAuthProviderAffiliateList.reopenClass({
  positionalParams: ['affiliates']
});

export default DukeDSAuthProviderAffiliateList;
