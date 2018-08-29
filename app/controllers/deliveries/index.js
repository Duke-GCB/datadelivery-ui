import Ember from 'ember';

export default Ember.Controller.extend({
  dukeDsUser: Ember.inject.service('duke-ds-user'),
  currentDukeDsUser: Ember.computed.alias('dukeDsUser.currentDukeDsUser')
});
