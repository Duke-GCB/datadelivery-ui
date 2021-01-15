import Model from '@ember-data/model';
import { attr } from '@ember-data/model';
import { pluralize } from 'ember-inflector';

export default Model.extend({
  uid: attr('string'),
  fullName: attr('string'),
  email: attr('string'),
  getOrRegisterUser() {
    let adapter = this.store.adapterFor(this.constructor.modelName);
    const userModelName = 'duke-ds-user';
    return adapter.getOrRegisterUser(this.uid).then(data => {
      this.store.pushPayload(userModelName, data);
      return this.store.peekRecord(userModelName, data[pluralize(userModelName)].id);
    });
  },
});
