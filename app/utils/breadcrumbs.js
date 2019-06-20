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
  'deliveries.show.resend-confirm': 'Confirm Resend',
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
  // Replace either 'index' alone or a trailing '.index
  if (routeName) {
    return routeName.replace(/^index$|\.index$/, '');
  } else {
    return null;
  }
}

const HomeCrumb = {
  routeName: 'index',
  label: getLabel(RouteLabels, 'index')
};

function makeCrumbs(routeLabels, homeCrumb, routeName, context) {
  // Handle the case where the route is 'index' or ends with '.index'
  routeName = stripIndex(routeName);
  let crumbs = [homeCrumb]; // Always start with home
  // If routeName is an empty string, we don't need to add any crumbs
  if (routeName) {
    let parts = routeName.split('.');
    const routeCrumbs = parts.map((part, index) => {
      const crumbRouteName = parts.slice(0, index + 1).join('.');
      return {
        routeName: crumbRouteName,
        label: getLabel(routeLabels, crumbRouteName, context)
      };
    });
    crumbs.addObjects(routeCrumbs);
  }
  // Filter out any crumbs with no label
  crumbs = crumbs.filterBy('label');
  return crumbs;
}

export { makeCrumbs, stripIndex, getLabel, HomeCrumb, RouteLabels};
