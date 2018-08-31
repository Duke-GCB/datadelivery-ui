import LoginController from 'drf-ember-frontend/controllers/login';
import Ember from 'ember';

export default LoginController.extend({
  authenticatedChanged: Ember.on('init', Ember.observer('session.isAuthenticated', function() {
    if(this.get('session.isAuthenticated')) {
      this.transitionToRoute('index');
    }
  }))
});
