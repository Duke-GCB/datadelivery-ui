import Ember from 'ember';

const DukeDsProjectSize = Ember.Component.extend({
  classNames: ['duke-ds-project-size'],
  ddsProjectSummary: null,
  total_size: Ember.computed.alias('ddsProjectSummary.total_size'),
  file_count: Ember.computed.alias('ddsProjectSummary.file_count'),
  folder_count: Ember.computed.alias('ddsProjectSummary.folder_count'),
  root_folder_count: Ember.computed.alias('ddsProjectSummary.root_folder_count'),
  sub_folder_count: Ember.computed('folder_count','root_folder_count',function () {
    return this.get('folder_count') - this.get('root_folder_count');
  })
});

DukeDsProjectSize.reopenClass({
  positionalParams: ['ddsProjectSummary']
});

export default DukeDsProjectSize;
