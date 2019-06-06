import Ember from 'ember';

const DukeDsProjectSize = Ember.Component.extend({
  classNames: ['duke-ds-project-size'],
  ddsProject: null,
  ddsProjectSummary: null,
  total_size: Ember.computed.alias('ddsProjectSummary.total_size'),
  file_count: Ember.computed.alias('ddsProjectSummary.file_count'),
  folder_count: Ember.computed.alias('ddsProjectSummary.folder_count'),

  fetchSummary() {
    let ddsProject = this.get('ddsProject');
    // If ddsProject is already fulfilled, make it into a simple promise
    if(ddsProject.get('isLoaded')) {
      ddsProject = Ember.RSVP.resolve(ddsProject);
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
