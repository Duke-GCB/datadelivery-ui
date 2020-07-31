import Component from '@ember/component';
import ProjectSummaryFetcher from 'datadelivery-ui/mixins/project-summary-fetcher';


const ProjectDetail = Component.extend(ProjectSummaryFetcher, {
  tagName: 'div',
  ddsProject: null,  /* populated by ProjectSummaryFetcher */
  ddsProjectSummary: null,
  classNames: ['project-detail']
});

ProjectDetail.reopenClass({
  positionalParams: ['ddsProject']
});

export default ProjectDetail;
