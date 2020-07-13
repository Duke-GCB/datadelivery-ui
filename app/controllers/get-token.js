import GetTokenController from 'drf-ember-frontend/controllers/get-token';

export default GetTokenController.extend({
  queryParams: ['successRoute'],
  successRoute: '/',
  failureRoute: '/login',
});
