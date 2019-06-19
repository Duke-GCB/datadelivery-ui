import { getLabel, stripIndex, makeCrumbs, RouteLabels, HomeCrumb } from 'datadelivery-ui/utils/breadcrumbs';
import { module, test } from 'qunit';

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
  assert.equal(stripIndex('index'), 'index'); // AM I sure about this one?
});

test('makeCrumbs makes 1 crumb for index', function(assert) {
  const crumbs = makeCrumbs(RouteLabels, HomeCrumb, 'index');
  assert.equal(crumbs.length, 1);
  assert.equal(crumbs[0].label, 'Home');
  assert.equal(crumbs[0].routeName, 'index');
});

test('makeCrumbs makes two crumbs for deliveries', function(assert) {
  const crumbs = makeCrumbs(RouteLabels, HomeCrumb, 'deliveries');
  assert.equal(crumbs.length, 2);
  assert.equal(crumbs[0].label, 'Home');
  assert.equal(crumbs[0].routeName, 'index');
  assert.equal(crumbs[1].label, 'Deliveries');
  assert.equal(crumbs[1].routeName, 'deliveries');
});
