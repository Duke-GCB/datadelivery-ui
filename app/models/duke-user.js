import Model from '@ember-data/model';
import {attr} from "@ember-data/model/index";

export default Model.extend({
  full_name: attr('string'),
});
