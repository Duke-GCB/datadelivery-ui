/**
 * Authenticator that reads token created by d4s2
 * Typically an authenticator would have an authenticate method.
 * We do not need this since d4s2 creates a cookie in the format needed by this authenticator.
 */

import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';
import ENV from 'datadelivery-ui/config/environment';

export default Base.extend({
  ajax: Ember.$.ajax,
  // These are expected to return promises
  restore(data) {
    // resolve if data.token is not empty, otherwise reject
    // copied from https://www.smallsurething.com/making-ember-and-django-play-nicely-together-a-todo-mvc-walkthrough/
    return new Ember.RSVP.Promise((resolve, reject) => {
      if (!Ember.isEmpty(data.token)) {
        resolve(data);
      } else {
        reject();
      }
    });
  },

  /**
   * Only used in development, production expects the web auth server to create the cookie .
   */
  authenticate(username, password) {
    // resolve with object containing token if successful, reject if not
    return new Ember.RSVP.Promise((resolve, reject) => {
      // Make an ajax call
      const ajax = this.get('ajax');
      ajax({
        url: ENV.APP.API_URL + '/api-auth-token/',
        type: 'POST',
        data: JSON.stringify({
          username: username,
          password: password
        }),
        contentType: 'application/json',
        dataType: 'json'
      }).then((response) => {
        Ember.run(function() { //what is this?
          resolve({
            token: response.token
          });
        });
      }, (xhr, status) => {
        let response = xhr.responseText || status;
        Ember.run(function() { // again what?
          reject(response);
        });
      });
    });
  },

  invalidate(data) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      if (!Ember.isEmpty(data.token)) {
        delete data.token;
        resolve(data);
      } else {
        reject();
      }
    });
  }
});
