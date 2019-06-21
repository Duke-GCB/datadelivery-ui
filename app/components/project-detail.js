import Component from '@ember/component';

const ProjectDetail = Component.extend({
  project: null,
  classNames: ['project-detail']
});

ProjectDetail.reopenClass({
  positionalParams: ['project']
});

export default ProjectDetail;
