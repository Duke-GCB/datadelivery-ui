import { observer } from '@ember/object';
import { on } from '@ember/object/evented';
import LoginController from 'drf-ember-frontend/controllers/login';

export default LoginController.extend({
  authenticatedChanged: on('init', observer('session.isAuthenticated', function() {
    if(this.get('session.isAuthenticated')) {
      this.transitionToRoute('index');
    }
  }))
});
