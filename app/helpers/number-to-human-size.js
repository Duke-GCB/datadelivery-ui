import { helper } from '@ember/component/helper';

// copied from https://github.com/kellysutton/ember-number-to-human-size/blob/master/addon/helpers/number-to-human-size.js
// that plugin was incompatible with ember 3 (https://github.com/kellysutton/ember-number-to-human-size/issues/5)
// simplified to always show 1024 units and round to 0
export function numberToHumanSize(params/*, hash*/) {
  let bytes = params[0];
  let roundAmount = 0;
  let thresh =  1024;
  let u = -1;
  let units = ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];

  if (Math.abs(bytes) < thresh) {
    return `${bytes} B`;
  }

  do {
    bytes /= thresh;
    ++u;
  } while(Math.abs(bytes) >= thresh && u < units.length - 1);

  return `${bytes.toFixed(roundAmount)} ${units[u]}`;
}

export default helper(numberToHumanSize);
