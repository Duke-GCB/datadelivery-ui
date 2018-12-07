import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  /*
    This method POSTs to the get-or-register-user detail route to get a duke-ds-user object
  */
  getOrRegisterUser(uid) {
    const url = `${this.buildURL('duke-ds-auth-provider-affiliate', uid)}get-or-register-user/`;
    return this.ajax(url, 'POST');
  }
});
