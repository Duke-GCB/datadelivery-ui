import Component from '@ember/component';

const ErrorMessageAlert = Component.extend({
});

ErrorMessageAlert.reopenClass({
  positionalParams: ['errorMessages']
});

export default ErrorMessageAlert;
