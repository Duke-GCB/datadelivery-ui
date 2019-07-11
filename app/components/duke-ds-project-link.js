import Ember from 'ember';

const DukeDsProjectLink = Ember.Component.extend({
  tagName: 'a',
  classNames: ['duke-ds-project-link', 'btn', 'btn-default'],
  attributeBindings: ['href'],
  href: Ember.computed.readOnly('ddsProject.url'),
  ddsProject: null,
});

DukeDsProjectLink.reopenClass({
  positionalParams: ['ddsProject']
});

export default DukeDsProjectLink;
