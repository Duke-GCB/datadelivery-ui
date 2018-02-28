import Ember from 'ember';

function toUserNameStr(users) {
  var userNames = '';
  var prefix = '';
  users.forEach(function (user) {
    const username = user.get('fullName');
    userNames += prefix + username;
    prefix = ', ';
  });
  return userNames;
}

const DeliveryDetail = Ember.Component.extend({
  classNames: ['delivery-detail'],
  editUserMessage: false, /* minimal field display allowing **/
  toUserNames: Ember.computed('delivery.transfer.toUsers.[]', function () {
    const users = this.get('delivery.transfer.toUsers');
    return toUserNameStr(users);
  })
});

DeliveryDetail.reopenClass({
  positionalParams: ['delivery']
});

export default DeliveryDetail;
