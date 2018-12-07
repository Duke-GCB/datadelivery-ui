import DS from 'ember-data';
import Ember from "ember";

export default DS.Model.extend({
  uid: DS.attr('string'),
  fullName: DS.attr('string'),
  email: DS.attr('string'),
  getOrRegisterUser() {
    let adapter = this.store.adapterFor(this.constructor.modelName);
    const userModelName = 'duke-ds-user';
    return adapter.getOrRegisterUser(this.get('uid')).then(data => {
      this.store.pushPayload(userModelName, data);
      return this.store.peekRecord(userModelName, data[Ember.String.pluralize(userModelName)].id);
    });

  },
});
