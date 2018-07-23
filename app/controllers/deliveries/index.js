import Ember from 'ember';

export default Ember.Controller.extend({
  application: Ember.inject.controller(),
  currentDukeDsUser: Ember.computed.alias('application.currentDukeDsUser')
});
