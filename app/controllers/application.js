import { observer } from '@ember/object';
import { on } from '@ember/object/evented';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  session: service('session'),
  user: service('user'),
  dukeDsUser: service('duke-ds-user'),
  currentDukeDsUser: null,
  authenticatedDidChange: observer('session.isAuthenticated', function () {
    if (this.get('session.isAuthenticated')) {
      this.get('user').currentUser().then(currentUser => {
        this.set('currentUser', currentUser);
      });
      this.get('dukeDsUser').currentDukeDsUser().then(currentDukeDsUser => {
        this.set('currentDukeDsUser', currentDukeDsUser);
      });
    } else {
      this.set('currentUser', null);
      this.set('currentDukeDsUser', null);
    }
  })
});


// application.js:16 Uncaught (in promise) TypeError: this.get(...).currentUser is not a function
