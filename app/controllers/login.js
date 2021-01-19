import LoginController from 'drf-ember-frontend/controllers/login';

export default LoginController.extend({
  queryParams: ['afterLogin'],
  afterLogin: '/'
});
