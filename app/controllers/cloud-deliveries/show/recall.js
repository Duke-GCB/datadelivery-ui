import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    back() {
      this.transitionToRoute('cloud-deliveries.show', this.model);
    },
    recallDelivery() {
      const projectName = this.get('model.project_name');
      const deliveryMessage = 'Canceled delivery of project ' + projectName + '.';
      this.get('model')
        .cancel()
        .then(() => this.transitionToRoute('cloud-deliveries.show', this.model, {
          queryParams: {
            infoMessage: deliveryMessage
          }
        }));
    }
  }
});
