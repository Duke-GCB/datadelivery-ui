import Component from '@ember/component';

export default Component.extend({
  tagName: 'table',
  classNames: ['table', 'table-bordered', 'table-striped'],
  removeUser: null, /** action */
  addUser: null, /** action */
  actions: {
    removeUser(shareUser) {
      this.removeUser(shareUser);
    },
    addUser() {
      this.addUser();
    }
  }
});
