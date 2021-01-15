import Component from '@ember/component';

export default Component.extend({
  actions: {
    onChange(selectedIdx) {
      const selectedEmailTemplateSet = this.emailTemplateSets.findBy('id', selectedIdx);
      this.onChange(selectedEmailTemplateSet);
    }
  }
});
