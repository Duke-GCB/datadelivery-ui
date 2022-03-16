import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import Component from '@ember/component';

export default Component.extend({
  classNames: ['az-project-size'],
  deliverySummary: null,
  total_size: alias('deliverySummary.total_size'),
  file_count: alias('deliverySummary.file_count'),
  folder_count: alias('deliverySummary.folder_count'),
  root_folder_count: alias('deliverySummary.root_folder_count'),
  sub_folder_count: computed('folder_count','root_folder_count',function () {
    return this.folder_count - this.root_folder_count;
  }),
  based_on: alias('deliverySummary.based_on'),
});
