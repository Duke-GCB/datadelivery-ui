import Ember from 'ember';

const ErrorMessageAlert = Ember.Component.extend({
});

ErrorMessageAlert.reopenClass({
  positionalParams: ['errorMessages']
});

export default ErrorMessageAlert;
