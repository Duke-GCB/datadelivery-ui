import Ember from 'ember';
import { makeCrumbs, stripIndex, HomeCrumb, RouteLabels} from 'datadelivery-ui/utils/breadcrumbs';

export default Ember.Component.extend({
  router: Ember.inject.service('-routing'),
  strippedRouteName: Ember.computed('router.currentRouteName', function() {
    // a trailing .index or index by itself is not meaningful for our route lookups
    return stripIndex(this.get('router.currentRouteName'));
  }),
  tagName: 'ol',
  classNames: ['breadcrumb'],
  context: null,
  crumbs: Ember.computed('strippedRouteName', 'context', function() {
    const strippedRouteName = this.get('strippedRouteName');
    const context = this.get('context');
    return makeCrumbs(RouteLabels, HomeCrumb, strippedRouteName, context);
  })
});
