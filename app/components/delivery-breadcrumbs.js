import Ember from 'ember';
import { makeCrumbs, stripIndex, HomeCrumb, RouteLabels} from 'datadelivery-ui/utils/breadcrumbs';

export default Ember.Component.extend({
  router: Ember.inject.service('-routing'),
  currentRouteName: Ember.computed('router.currentRouteName', function() {
    return stripIndex(this.get('router.currentRouteName'));
  }),
  tagName: 'ol',
  classNames: ['breadcrumb'],
  context: null,
  crumbs: Ember.computed('currentRouteName', function() {
    const currentRouteName = this.get('currentRouteName');
    const context = this.get('context');
    return makeCrumbs(RouteLabels, HomeCrumb, currentRouteName, context);
  })
});
