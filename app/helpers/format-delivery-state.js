import { helper as buildHelper } from '@ember/component/helper';

export function formatDeliveryState(params) {
  if(params.length > 0) {
    return params[0].capitalize();
  } else {
    return '';
  }
}

export default buildHelper(formatDeliveryState);
