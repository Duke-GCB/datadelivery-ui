import { getLabel, stripIndex, makeCrumbs, RouteLabels, HomeCrumb } from 'datadelivery-ui/utils/breadcrumbs';
import { module, test } from 'qunit';
import Ember from 'ember';

module('Unit | Utility | breadcrumbs');

test('getLabel returns strings, functions, or contexts as needed', function (assert) {
  const routeLabels = {
    'route.string': 'string',
    'route.function': function(x) { return `function(${x})`;}
  };
  const context = 'context';
  assert.equal(getLabel(routeLabels, 'route.string', context), 'string');
  assert.equal(getLabel(routeLabels, 'route.function', context), 'function(context)');
  assert.equal(getLabel(routeLabels, 'route.undefined', context), 'context');
});

test('stripIndex removes trailing .index', function(assert) {
  assert.equal(stripIndex('deliveries.index'), 'deliveries');
  assert.equal(stripIndex('deliveries.show'), 'deliveries.show');
  assert.equal(stripIndex('index'), '');
  assert.equal(stripIndex('someindex'), 'someindex');
  assert.equal(stripIndex('.index'), '');
});

test('makeCrumbs makes 1 crumb for index', function(assert) {
  const crumbs = makeCrumbs(RouteLabels, HomeCrumb, 'index');
  assert.deepEqual(crumbs, [
    { routeName: 'index', label: 'Home'},
  ]);
});

test('makeCrumbs makes two crumbs for deliveries', function(assert) {
  const crumbs = makeCrumbs(RouteLabels, HomeCrumb, 'deliveries');
  assert.deepEqual(crumbs, [
    { routeName: 'index', label: 'Home'},
    { routeName: 'deliveries', label: 'Deliveries'}
  ]);
});

test('makeCrumbs makes crumbs for deliveries.show.resend', function(assert) {
  const delivery = Ember.Object.create({project: {name: 'My Project'}});
  const crumbs = makeCrumbs(RouteLabels, HomeCrumb, 'deliveries.show.resend', delivery);
  assert.deepEqual(crumbs, [
    { routeName: 'index', label: 'Home'},
    { routeName: 'deliveries', label: 'Deliveries'},
    { routeName: 'deliveries.show', label: 'My Project'},
    { routeName: 'deliveries.show.resend', label: 'Resend'},
  ]);
});

test('makeCrumbs filters out routes with no label', function(assert) {
  const testLabels = {
    'route': 'Route',
    'route.sixty': 'Sixty'
  };
  assert.notOk(getLabel(testLabels, 'route.sixty.six'));
  const crumbs = makeCrumbs(testLabels, HomeCrumb, 'route.sixty.six');
  assert.deepEqual(crumbs, [
    { routeName: 'index', label: 'Home'},
    { routeName: 'route', label: 'Route'},
    { routeName: 'route.sixty', label: 'Sixty'},
  ]);
});
