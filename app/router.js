import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login');
  this.route('deliveries', function() {
    this.route('show', { path: '/:delivery_id'}, function () {
      this.route('resend', {});
    });
  });
});

export default Router;
