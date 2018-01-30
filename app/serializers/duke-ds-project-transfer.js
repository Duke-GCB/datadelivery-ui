import ApplicationSerializer from './application';
import DS from 'ember-data';

export default ApplicationSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    toUsers: {embedded: 'always'},
    fromUser: {embedded: 'always'},
    project: {embedded: 'always'}
  },

});
