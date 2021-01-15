import ApplicationSerializer from './application';
import { EmbeddedRecordsMixin } from '@ember-data/serializer/rest';

export default ApplicationSerializer.extend(EmbeddedRecordsMixin, {
  attrs: {
    toUsers: {embedded: 'always'},
    fromUser: {embedded: 'always'},
    project: {embedded: 'always'}
  },

});
