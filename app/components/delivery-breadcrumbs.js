import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import {
  makeCrumbs,
  stripIndex,
  HomeCrumb,
  RouteLabels
} from 'datadelivery-ui/utils/breadcrumbs';

export default Component.extend({
  router: service(),
  strippedRouteName: computed('router.currentRouteName', function() {
    // a trailing .index or index by itself is not meaningful for our route lookups
    return stripIndex(this.get('router.currentRouteName'));
  }),
  tagName: 'ol',
  classNames: ['breadcrumb'],
  context: null,
  crumbs: computed('strippedRouteName', 'context', function() {
    const strippedRouteName = this.get('strippedRouteName');
    const context = this.get('context');
    return makeCrumbs(RouteLabels, HomeCrumb, strippedRouteName, context);
  })
});
