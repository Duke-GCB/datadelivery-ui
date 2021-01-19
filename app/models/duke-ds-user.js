import Model from '@ember-data/model';
import { attr } from '@ember-data/model';

export default Model.extend({
  fullName: attr('string'),
  email: attr('string'),
  username: attr('string')
});
