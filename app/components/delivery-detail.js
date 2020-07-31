import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import ProjectSummaryFetcher from 'datadelivery-ui/mixins/project-summary-fetcher';

const DeliveryDetail = Component.extend(ProjectSummaryFetcher, {
  transfer: null,
  ddsProject: alias('transfer.project'),
  ddsProjectSummary: null, /* populated by ProjectSummaryFetcher */
  showProjectDetails: false,
  classNames: ['delivery-detail'],
  editUserMessage: false, /* minimal field display allowing **/
  delivery: alias('transfer.delivery'),
  showEmail: alias('transfer.canResend')
});

DeliveryDetail.reopenClass({
  positionalParams: ['transfer', 'showProjectDetails']
});

export default DeliveryDetail;
