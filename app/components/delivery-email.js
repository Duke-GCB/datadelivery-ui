import Ember from 'ember';
import {formatEmailText} from 'datadelivery-ui/utils/email-formatter';

const DeliveryEmail = Ember.Component.extend({
  classNames: ['well', 'well-sm', 'delivery-email'],
  value: null, //value to be displayed in the textarea
  formattedValue: Ember.computed('value', function () {
    const value = this.get('value');
    return formatEmailText(value);
  })
});

DeliveryEmail.reopenClass({
  positionalParams: ['value']
});

export default DeliveryEmail;
