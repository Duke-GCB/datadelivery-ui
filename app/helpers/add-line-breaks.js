import { helper as buildHelper } from '@ember/component/helper';
import { htmlSafe } from '@ember/string';

export function addLineBreaks(params) {
  const text = params[0];
  const replaced = text.replace(/\n/g, '<br>');
  return htmlSafe(replaced);
}

export default buildHelper(addLineBreaks);
