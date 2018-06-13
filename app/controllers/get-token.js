import GetTokenController from 'drf-ember-frontend/controllers/get-token';

export default GetTokenController.extend({
  successRoute: '/deliveries',
  failureRoute: '/login',
});
