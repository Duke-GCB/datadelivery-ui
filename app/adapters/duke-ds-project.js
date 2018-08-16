import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  getUserProjectAuthRole(projectId, userId) {
    const dukeDsProjectUrl = this.buildURL('duke-ds-project', projectId);
    const url = `${dukeDsProjectUrl}permissions/?user=${userId}`;
    return this.ajax(url).then(response => {
      const permissions = response['duke-ds-project-permissions'];
      if (permissions.length) {
        return permissions[0]['auth_role'];
      }
      return  null;
    });
  },
});
