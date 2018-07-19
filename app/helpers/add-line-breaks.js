import Ember from 'ember';

export function addLineBreaks(params/*, hash*/) {
  const text = params[0];
  const replaced = text.replace(/\n/g, '<br>');
  return Ember.String.htmlSafe(replaced);
}

export default Ember.Helper.helper(addLineBreaks);
