// from http://onechiporenko.github.io/ember-models-table/v.2/#/examples/select-rows-with-checkboxes
import Component from '@ember/component';
import layout from '../templates/components/select-row-checkbox';

export default Component.extend({
  layout,
  actions: {
    clickOnRow(index, record, event) {
      this.clickOnRow(index, record);
      event.stopPropagation();
    }
  }
});
