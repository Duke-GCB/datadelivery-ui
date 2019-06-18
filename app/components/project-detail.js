import Ember from 'ember';

const ProjectDetail = Ember.Component.extend({
  project: null,
  classNames: ['project-detail']
});

ProjectDetail.reopenClass({
  positionalParams: ['project']
});

export default ProjectDetail;
