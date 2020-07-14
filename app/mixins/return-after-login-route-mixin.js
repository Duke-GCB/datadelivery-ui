import Mixin from '@ember/object/mixin';

export default Mixin.create({
  triggerAuthentication() {
    this.transitionTo(this.get('authenticationRoute'), {
      queryParams: {
        afterLogin: this.get('routeName')
      }
    });
  }
});



