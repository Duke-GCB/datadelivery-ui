import Ember from 'ember';

const ProjectDetail = Ember.Component.extend({
  tagName: 'dl',
  project: null,
  classNames: ['project-detail'],
  showWarning: true,
});

ProjectDetail.reopenClass({
  positionalParams: ['project']
});

export default ProjectDetail;
