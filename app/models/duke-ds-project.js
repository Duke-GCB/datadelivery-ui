import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  getUserProjectAuthRole(userId) {
    let adapter = this.store.adapterFor(this.constructor.modelName);
    return adapter.getUserProjectAuthRole(this.get('id'), userId);
  },
});
