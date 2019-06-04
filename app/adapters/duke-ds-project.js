import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  getUserProjectAuthRole(projectId, userId) {
    // Returns a promise that will return the auth_role for the specified user/project or null.
    // A list of permissions is fetched from the duke-ds-project/<projectId>/permissions/ endpoint with
    // filtering for userId. This should always return an array of one item.
    const dukeDsProjectUrl = this.buildURL('duke-ds-project', projectId);
    const url = `${dukeDsProjectUrl}permissions/?user=${userId}`;
    return this.ajax(url).then(response => {
      const permissions = response['duke-ds-project-permissions'];
      if (permissions.length) {
        return permissions[0]['auth_role'];
      }
      return null;
    });
  },
  getSummary(projectId) {
    const dukeDsProjectUrl = this.buildURL('duke-ds-project', projectId);
    const url = `${dukeDsProjectUrl}summary/`;
    return this.ajax(url).then(response => {
      return response['duke-ds-project-summaries'];
    });
  }
});
