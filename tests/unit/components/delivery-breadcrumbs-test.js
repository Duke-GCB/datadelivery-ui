import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Component | delivery breadcrumbs', function(hooks) {
  setupTest(hooks);

  test('it computes crumbs from router.currentRouteName', function(assert) {
    const MockRouter = EmberObject.create({currentRouteName: 'index'});
    const component = this.owner.factoryFor('component:delivery-breadcrumbs').create({ router: MockRouter });

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
    component.set('context', EmberObject.create({name: 'Project Name'}));
    assert.deepEqual(component.get('crumbs'), [
      {routeName: 'index', label: 'Home'},
      {routeName: 'duke-ds-projects', label: 'Duke DS Projects'},
      {routeName: 'duke-ds-projects.show', label: 'Project Name'}
      ]
    );
  });
});
