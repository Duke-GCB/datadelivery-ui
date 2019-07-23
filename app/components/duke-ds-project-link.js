import { readOnly } from '@ember/object/computed';
import Component from '@ember/component';

const DukeDsProjectLink = Component.extend({
  tagName: 'a',
  classNames: ['duke-ds-project-link', 'btn', 'btn-default'],
  attributeBindings: ['href'],
  href: readOnly('ddsProject.url'),
  ddsProject: null,
});

DukeDsProjectLink.reopenClass({
  positionalParams: ['ddsProject']
});

export default DukeDsProjectLink;
