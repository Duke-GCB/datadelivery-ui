import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ReturnAfterLoginRouteMixin from 'datadelivery-ui/mixins/return-after-login-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, ReturnAfterLoginRouteMixin, {});
