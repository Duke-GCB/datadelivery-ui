import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Controller.extend({
  dukeDsUser: Ember.inject.service('duke-ds-user'),
  currentDukeDsUser: Ember.computed.alias('dukeDsUser.currentDukeDsUser')
});
