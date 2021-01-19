import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import Component from '@ember/component';

const DukeDsProjectSize = Component.extend({
  classNames: ['duke-ds-project-size'],
  ddsProjectSummary: null,
  total_size: alias('ddsProjectSummary.total_size'),
  file_count: alias('ddsProjectSummary.file_count'),
  folder_count: alias('ddsProjectSummary.folder_count'),
  root_folder_count: alias('ddsProjectSummary.root_folder_count'),
  sub_folder_count: computed('folder_count','root_folder_count',function () {
    return this.folder_count - this.root_folder_count;
  })
});

DukeDsProjectSize.reopenClass({
  positionalParams: ['ddsProjectSummary']
});

export default DukeDsProjectSize;
