import { resolve } from 'rsvp';
import { alias } from '@ember/object/computed';
import Component from '@ember/component';

const DukeDsProjectSize = Component.extend({
  classNames: ['duke-ds-project-size'],
  ddsProject: null,
  ddsProjectSummary: null,
  total_size: alias('ddsProjectSummary.total_size'),
  file_count: alias('ddsProjectSummary.file_count'),
  folder_count: alias('ddsProjectSummary.folder_count'),

  fetchSummary() {
    let ddsProject = this.get('ddsProject');
    // If ddsProject is already fulfilled, make it into a simple promise
    if(ddsProject.get('isLoaded')) {
      ddsProject = resolve(ddsProject);
    }
    ddsProject.then((loadedProject) => {
      return loadedProject.getSummary();
    }).then((summary) => {
      this.set('ddsProjectSummary', summary);
    });
  },
  didInsertElement() {
    this._super(...arguments);
    this.fetchSummary();
  },
});

DukeDsProjectSize.reopenClass({
  positionalParams: ['ddsProject']
});

export default DukeDsProjectSize;
