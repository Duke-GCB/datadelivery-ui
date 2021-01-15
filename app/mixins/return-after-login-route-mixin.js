import Mixin from '@ember/object/mixin';

export default Mixin.create({
  triggerAuthentication() {
    this.transitionTo(this.authenticationRoute, {
      queryParams: {
        afterLogin: this.routeName
      }
    });
  }
});



