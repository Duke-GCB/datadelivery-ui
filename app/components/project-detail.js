import Ember from 'ember';

const ProjectDetail = Ember.Component.extend({
  tagName: 'div',
  ddsProject: null,
  ddsProjectSummary: null,
  classNames: ['project-detail'],
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

ProjectDetail.reopenClass({
  positionalParams: ['ddsProject']
});

export default ProjectDetail;
