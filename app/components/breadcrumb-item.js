import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  label: null, /* string to be displayed to the user */
  routeName: null, /* routeName to be used with internal link-to */
  selectedRouteName: null, /* used to determine if this route is selected */
  context: null, /* context to be used with routeName */
  isSelected: Ember.computed('routeName', 'selectedRouteName', function () {
    return this.get('routeName') === this.get('selectedRouteName');
  })
});