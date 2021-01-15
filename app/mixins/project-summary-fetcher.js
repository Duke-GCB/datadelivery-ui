import Mixin from '@ember/object/mixin';
import { resolve } from 'rsvp';

// sets ddsProjectSummary property based on ddsProject property
export default Mixin.create({
  fetchSummary() {
    let ddsProject = this.ddsProject;
    // If ddsProject is already fulfilled, make it into a simple promise
    if(ddsProject.get('isLoaded')) {
      ddsProject = resolve(ddsProject);
    }
    return ddsProject.then((loadedProject) => {
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
