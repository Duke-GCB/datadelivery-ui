import { getLabel, stripIndex, makeCrumbs } from 'datadelivery-ui/utils/breadcrumbs';
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

test('makeCrumbs always includes home', function(assert) {
  const homeCrumb = {routeName: 'index', label: 'Home'};
  const context = null;
  const crumbs = makeCrumbs([], homeCrumb, 'index', context);
  assert.equal(crumbs.length, 1);
});
