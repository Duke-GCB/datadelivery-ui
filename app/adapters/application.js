import DRFAdapter from 'drf-ember-frontend/adapters/drf-adapter';
import ENV from 'datadelivery-ui/config/environment'; // This is how we load config variables from our environment.js file
import TokenAuthorizerMixin from 'ember-simple-auth-token/mixins/token-authorizer';

export default DRFAdapter.extend(TokenAuthorizerMixin, {
  host: ENV.APP.API_URL,
  namespace: ENV.APP.API_NAMESPACE
});
