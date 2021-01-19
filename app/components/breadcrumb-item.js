import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  tagName: 'li',
  classNames: ['breadcrumb-item'],
  label: null, /* string to be displayed to the user */
  routeName: null, /* routeName to be used with internal link-to */
  selectedRouteName: null, /* used to determine if this route is selected */
  context: null, /* context to be used with routeName */
  isSelected: computed('routeName', 'selectedRouteName', function () {
    // Tried Ember.computed.equal but it doesn't work here :(
    return this.routeName === this.selectedRouteName;
  })
});
