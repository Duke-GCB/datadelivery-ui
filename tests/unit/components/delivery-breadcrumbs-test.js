import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('delivery-breadcrumbs', 'Unit | Component | delivery breadcrumbs', {
  unit: true
});

test('it computes crumbs from router.currentRouteName', function(assert) {
  const MockRouter = Ember.Object.create({currentRouteName: 'index'});
  const component = this.subject({ router: MockRouter });

  // At index route, there should be one crumb
  assert.deepEqual(component.get('crumbs'), [
    {routeName: 'index', label: 'Home'}
    ]
  );

  // At deliveries route, there should be two crumbs
  MockRouter.set('currentRouteName', 'deliveries');
  assert.deepEqual(component.get('crumbs'), [
    {routeName: 'index', label: 'Home'},
    {routeName: 'deliveries', label: 'Deliveries'}
    ]
  );

  MockRouter.set('currentRouteName', 'duke-ds-projects.show');
  component.set('context', Ember.Object.create({name: 'Project Name'}));
  assert.deepEqual(component.get('crumbs'), [
    {routeName: 'index', label: 'Home'},
    {routeName: 'duke-ds-projects', label: 'Duke DS Projects'},
    {routeName: 'duke-ds-projects.show', label: 'Project Name'}
    ]
  );
});
