import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  urlForQuery(query) {
    /*
    Project permissions are a nested route under the duke-ds-project route.
    There is no top level route to GET an individual permission.
    This means querying permissions requires a project id parameter that will be used the build the base url.
    */
    const projectId = query.project;
    delete query.project; // remove project from query so it will not be appended to the url
    return this.buildURL('duke-ds-project') + projectId + '/permissions/';
  }
});
