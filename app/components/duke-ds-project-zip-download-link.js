import Ember from 'ember';
import ENV from 'datadelivery-ui/config/environment';

const DukeDsProjectZipDownloadLink = Ember.Component.extend({
  classNames: ['duke-ds-project-zip-download-link'],
  tagName: 'a',
  attributeBindings: ['href'],
  ddsProject: null,
  href: Ember.computed('ddsProject.{id,name}', function () {
    const projectId = this.get('ddsProject.id');
    const projectName = this.get('ddsProject.name');
    return `${ENV.APP.API_URL}/download/dds-projects/${projectId}/${projectName}.zip`;
  }),
  filename: Ember.computed('ddsProject.name', function() {
    const projectName = this.get('ddsProject.name');
    return `${projectName}.zip`;
  })
});

DukeDsProjectZipDownloadLink.reopenClass({
  positionalParams: ['ddsProject']
});

export default DukeDsProjectZipDownloadLink;
