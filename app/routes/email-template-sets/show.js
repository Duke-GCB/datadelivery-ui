import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return this.get('store').findRecord('email-template-set', params.email_template_set_id);
  },
});
