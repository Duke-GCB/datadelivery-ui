import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('duke-ds-user-search', 'Unit | Component | duke ds user search', {
  unit: true
});

test('it queries the store on doSearch and sets users', function(assert) {
  const mockUsers = ['user1', 'user2','user3'];
  const mockStore = Ember.Object.create({
    query(modelName, params) {
      assert.equal(modelName, 'duke-ds-user');
      assert.deepEqual(params, {email: 'user@example.com'});
      return Ember.RSVP.resolve(mockUsers);
    }
  });
  let component = this.subject({store: mockStore});
  // Initially users should be empty
  assert.deepEqual(component.get('users'), []);

  // Send the action in a loop
  Ember.run(() => {
    component.send('doSearch', {email: 'user@example.com'});
  });

  // doSearch should set the results to component.users
  assert.deepEqual(component.get('users'), mockUsers);
});

test('it clears selected users on doSearch', function(assert) {
  let component = this.subject({store: Ember.Object.create({query() { return Ember.RSVP.resolve(); }})});
  component.set('selectedUsers', [1]);
  assert.equal(component.get('selectedUsers.length'), 1);
  // Send the action in a loop
  Ember.run(() => { component.send('doSearch'); });
  assert.equal(component.get('selectedUsers.length'), 0);
});

test('it sends onUserSelected when receiving selectionChanged', function(assert) {
  assert.expect(1);
  const mockUser = Ember.Object.create({name: 'Chris'});
  const onUserSelected = function(user) {
    assert.equal(user, mockUser);
  };
  let component = this.subject({onUserSelected: onUserSelected});
  Ember.run(() => {
    component.send('selectionChanged', mockUser);
  });
});
