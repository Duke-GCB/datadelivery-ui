import Ember from 'ember';

const RouteLabels = {
  /*
   Deliberately NOT an Ember.Object, because dotted notation in route names
    would be interpreted by Ember.get() as traversing nested objects
   */
  'index': 'Home',
  'deliveries': 'Deliveries',
  'deliveries.show': context => Ember.get(context, 'project.name'),
  'deliveries.show.resend': 'Resend',
  'deliveries.show.resend-confrirm': 'Confirm Resend',
  'deliveries.new': 'New',
  'deliveries.show.recall': 'Recall',
  'duke-ds-projects': 'Duke DS Projects',
  'duke-ds-projects.show': context => Ember.get(context, 'name')
};

function getLabel(routeLabels, routeName, context) {
  const label = routeLabels[routeName];
  const labelType = Ember.typeOf(label);
  if (labelType  === 'function') {
    return label(context);
  } else if (labelType === 'undefined') {
    return context;
  } else {
    return label;
  }
}

function stripIndex(routeName) {
  return routeName.replace(/\.index$/, '');
}

const HomeCrumb = {
  routeName: 'index',
  label: getLabel(RouteLabels, 'index')
};

function makeCrumbs(routeLabels, homeCrumb, routeName, context) {
  // If the route ends with .index, we don't need that part
  routeName = stripIndex(routeName);
  let parts = routeName.split('.');
  let crumbs = parts.map((part, index) => {
    const prefix = parts.slice(0, index + 1).join('.');
    return {
      routeName: prefix,
      label: getLabel(routeLabels, prefix, context)
    };
  });
  crumbs.insertAt(0, homeCrumb);
  return crumbs;
}

export { makeCrumbs, stripIndex, getLabel, HomeCrumb, RouteLabels};
