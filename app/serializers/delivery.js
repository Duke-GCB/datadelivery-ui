import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  // Related fields from the delivery (e.g. project) are specified with an `_id` suffix in the
  // incoming JSON payload. But Ember treats these as related objects, so it's more natural for
  // the ember model to use a field like `project` rather than `project_id`
  keyForRelationship(key) {
    const localKey = this._super(key);
    return `${localKey}_id`;
  }
});
