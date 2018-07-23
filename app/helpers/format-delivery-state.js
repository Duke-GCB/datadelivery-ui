import Ember from 'ember';

export function formatDeliveryState(params) {
  if(params.length > 0) {
    return params[0].capitalize();
  } else {
    return '';
  }
}

export default Ember.Helper.helper(formatDeliveryState);
