import { alias } from '@ember/object/computed';
import Controller, { inject as controller } from '@ember/controller';

export default Controller.extend({
  application: controller(),
  currentDukeDsUser: alias('application.currentDukeDsUser'),
  currentUser: alias('application.currentUser')
});
