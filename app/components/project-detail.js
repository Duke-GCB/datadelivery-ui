import Ember from 'ember';

const ProjectDetail = Ember.Component.extend({
  tagName: 'div',
  project: null,
  classNames: ['project-detail'],
});

ProjectDetail.reopenClass({
  positionalParams: ['project']
});

export default ProjectDetail;
