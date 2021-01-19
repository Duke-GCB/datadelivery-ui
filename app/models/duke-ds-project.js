import Model from '@ember-data/model';
import { attr } from '@ember-data/model';

export default Model.extend({
  name: attr('string'),
  url: attr('string'),
  createdOn: attr('date'),
  lastUpdatedOn: attr('date'),
  getUserProjectAuthRole(userId) {
    let adapter = this.store.adapterFor(this.constructor.modelName);
    return adapter.getUserProjectAuthRole(this.id, userId);
  },
  getSummary() {
    let adapter = this.store.adapterFor(this.constructor.modelName);
    return adapter.getSummary(this.id);
  }
});
