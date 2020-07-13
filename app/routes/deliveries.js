import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  router: service(),
  triggerAuthentication() {
    let authenticationRoute = this.get('authenticationRoute');
    this.transitionTo(authenticationRoute, {
      queryParams: {
        sort: this.get('router.currentRouteName')
      }
    });
  },
});
