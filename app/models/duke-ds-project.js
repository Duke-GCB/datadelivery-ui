import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  url: DS.attr('string'),
  createdOn: DS.attr('date'),
  lastUpdatedOn: DS.attr('date'),
  getUserProjectAuthRole(userId) {
    let adapter = this.store.adapterFor(this.constructor.modelName);
    return adapter.getUserProjectAuthRole(this.get('id'), userId);
  },
  getSummary() {
    let adapter = this.store.adapterFor(this.constructor.modelName);
    return adapter.getSummary(this.get('id'));
  }
});
