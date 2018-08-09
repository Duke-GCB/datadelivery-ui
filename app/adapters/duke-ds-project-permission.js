import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  urlForQuery(query) {
    const projectId = query.project;
    delete query.project; // remove project from query so it will not be appended to the url
    return this.buildURL('duke-ds-project') + projectId + '/permissions/';
  }
});
