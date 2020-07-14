import GetTokenController from 'drf-ember-frontend/controllers/get-token';
import { alias } from '@ember/object/computed';

export default GetTokenController.extend({
  queryParams: ['afterLogin'],
  afterLogin: '/',
  successRoute: alias('afterLogin'),
  failureRoute: '/login',
});
