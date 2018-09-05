import Ember from 'ember';

export default Ember.Component.extend({
  projectName: null, // string property - name of the project to display
  backRoute: null, // string property - name of Back button destination
  disableBack: null, // boolean property - disables Back button
  nextRoute: null, // string property - name of Next button destination
  disableNext: null, // boolean property - disables Next button
});
