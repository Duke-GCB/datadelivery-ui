import EmberRouter from '@ember/routing/router';
import config from 'my-app/config/environment';

class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('login');
  this.route('deliveries', function() {
    this.route('show', { path: '/:transfer_id'}, function () {
      this.route('resend', {});
      this.route('resend-confirm');
      this.route('recall');
    });
    this.route('new', function() {
      this.route('select-project');
      this.route('select-recipient');
      this.route('enter-user-message');
      this.route('confirm');
      this.route('select-share-users');
      this.route('select-share-user');
    });
    this.route('setup-instructions');
  });
  this.route('get-token');
  this.route('duke-ds-projects', function() {
    this.route('show', { path: '/:project_id'} );
  });
  this.route('email-template-sets', function() {
    this.route('show', { path: '/:email_template_set_id'} );
  });
});

export default Router;
