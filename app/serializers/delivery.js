import ApplicationSerializer from './application';
import { singularize } from 'ember-inflector';

export default ApplicationSerializer.extend({
  // Related fields from the delivery (e.g. project) are specified with an `_id` suffix in the
  // incoming JSON payload. But Ember treats these as related objects, so it's more natural for
  // the ember model to use a field like `project` rather than `project_id`
  keyForRelationship(key, relationship) {
    const localKey = this._super(key);
    if(relationship == 'hasMany') {
      // For hasMany relationships, make the key singular, since we'll be pluralizing id
      return `${singularize(localKey)}_ids`;
    } else if(relationship == 'belongsTo') {
      // for belongsTo relationships, just append _id
      return `${localKey}_id`;
    } else {
      return localKey;
    }
  }
});
