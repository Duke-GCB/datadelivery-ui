import { observer } from '@ember/object';
import { on } from '@ember/object/evented';
import LoginController from 'drf-ember-frontend/controllers/login';

export default LoginController.extend({
  queryParams: ['afterLogin'],
  afterLogin: '/',
  authenticatedChanged: observer('session.isAuthenticated', function() {
    if(this.get('session.isAuthenticated')) {
      this.transitionToRoute('index');
    }
  })
});
