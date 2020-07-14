import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  triggerAuthentication() {
    this.transitionTo(this.get('authenticationRoute'), { queryParams: { successRoute: 'deliveries'}});
  }
});
