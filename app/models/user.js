import Model from '@ember-data/model';
import { attr } from '@ember-data/model';

export default Model.extend({
  username: attr('string'),
  first_name: attr('string'),
  last_name: attr('string'),
  email: attr('string'),
  setupForDelivery: attr('boolean')
});
