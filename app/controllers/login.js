import LoginController from 'drf-ember-frontend/controllers/login';

export default LoginController.extend({
  authenticatedChanged: Ember.on('init', Ember.observer('session.isAuthenticated', function() {
    if(this.get('session.isAuthenticated')) {
      this.transitionToRoute('index');
    }
  }))
});
