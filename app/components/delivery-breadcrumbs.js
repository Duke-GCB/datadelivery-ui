import Ember from 'ember';
import { makeCrumbs, stripIndex, HomeCrumb, RouteLabels} from 'datadelivery-ui/utils/breadcrumbs';

export default Ember.Component.extend({
  router: Ember.inject.service('-routing'),
  currentRouteName: Ember.computed.alias('router.currentRouteName'),
  tagName: 'ol',
  classNames: ['breadcrumb'],
  context: null,
  crumbs: Ember.computed('currentRouteName', 'context', function() {
    const currentRouteName = this.get('currentRouteName');
    // a trailing .index or index by itself is not meaningful for our route lookups
    const strippedRouteName = stripIndex(currentRouteName);
    const context = this.get('context');
    return makeCrumbs(RouteLabels, HomeCrumb, strippedRouteName, context);
  })
});
