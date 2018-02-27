import Ember from 'ember';
import {formatEmailText} from 'datadelivery-ui/utils/email-formatter';

export default Ember.Component.extend({
  tagName: 'textarea',
  classNames: ['form-control'],
  attributeBindings: ['readonly', 'rows'],
  readonly: true,
  value: null, //value to be displayed in the textarea
  rows: 2, // number of rows to show
  formattedValue: Ember.computed('value', function () {
    const value = this.get('value');
    return formatEmailText(value);
  })
});

