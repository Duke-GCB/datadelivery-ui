import Ember from 'ember';
import { makeCrumbs, stripIndex } from 'datadelivery-ui/utils/breadcrumbs';

export default Ember.Component.extend({
  router: Ember.inject.service('-routing'),
  currentRouteName: Ember.computed('router.currentRouteName', function() {
    return stripIndex(this.get('router.currentRouteName'));
  }),
  tagName: 'ol',
  classNames: ['breadcrumb'],
  context: null,
  crumbs: Ember.computed('currentRouteName', function() {
    return makeCrumbs(this.get('currentRouteName'), this.get('context'));
  })
});
