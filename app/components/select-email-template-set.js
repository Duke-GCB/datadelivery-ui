import Component from '@ember/component';

export default Component.extend({
  actions: {
    onChange(selectedIdx) {
      const selectedEmailTemplateSet = this.get('emailTemplateSets').findBy('id', selectedIdx);
      this.get('onChange')(selectedEmailTemplateSet);
    }
  }
});
