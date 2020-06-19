import Component from '@ember/component';

export default Component.extend({
  init() {
    this._super(...arguments);

    this.columns = [
      {propertyName: "name", title: "Name",  routeName: "email-template-sets.show"},
      {propertyName: "ccAddress", title: "CC Address"},
      {propertyName: "replyAddress", title: "Reply-To Address"},
      {propertyName: "default", title: "Default Template"},
    ];
  }
});
