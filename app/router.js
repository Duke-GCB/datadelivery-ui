import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login');
  this.route('deliveries', function() {
    this.route('show', { path: '/:transfer_id'}, function () {
      this.route('resend', {});
      this.route('resend-confirm');
    });
    this.route('new', function() {
      this.route('select-project');
      this.route('select-recipient');
      this.route('enter-user-message');
      this.route('confirm');
    });
  });
  this.route('get-token');
});

export default Router;
