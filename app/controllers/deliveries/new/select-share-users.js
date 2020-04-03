import { all } from 'rsvp';
import BaseController from './base';

export default BaseController.extend({
  backRoute: 'deliveries.new.enter-user-message',
  nextRoute: 'deliveries.new.enter-user-message',
  actions: {
    affiliateSelected(selectedAffiliates) {
      if(selectedAffiliates.get('length') == 0) {
        this.set('shareUsers', []);
      } else {
        // Obtain the duke-ds-user for the selected affiliates
        all(selectedAffiliates
          .map(item => item.getOrRegisterUser()))
          .then((dukeDSUsers) => this.set('shareUsers', dukeDSUsers));
      }
    },
  }
});
