import { moduleForComponent, test } from 'ember-qunit';
import Ember from "ember";

moduleForComponent('duke-ds-auth-provider-affiliate-search', 'Unit | Component | duke ds auth provider affiliate search', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar'],
  unit: true
});

test('it queries the store on doSearch and sets affiliates', function(assert) {
  const mockAffiliates = ['user1', 'user2','user3'];
  const mockStore = Ember.Object.create({
    query(modelName, params) {
      assert.equal(modelName, 'duke-ds-auth-provider-affiliate');
      assert.deepEqual(params, {email: 'user@example.com'});
      return Ember.RSVP.resolve(mockAffiliates);
    }
  });
  let component = this.subject({store: mockStore});
  // Initially users should be empty
  assert.deepEqual(component.get('affiliates'), []);

  // Send the action in a loop
  Ember.run(() => {
    component.send('doSearch', {email: 'user@example.com'});
  });

  // doSearch should set the results to component.users
  assert.deepEqual(component.get('affiliates'), mockAffiliates);
});

test('it clears selected affiliates on doSearch', function(assert) {
  let component = this.subject({store: Ember.Object.create({query() { return Ember.RSVP.resolve(); }})});
  component.set('selectedAffiliates', [1]);
  assert.equal(component.get('selectedAffiliates.length'), 1);
  // Send the action in a loop
  Ember.run(() => { component.send('doSearch'); });
  assert.equal(component.get('selectedAffiliates.length'), 0);
});

test('it sends onAffiliateSelected when receiving selectionChanged', function(assert) {
  assert.expect(1);
  const mockAffiliate = Ember.Object.create({name: 'Chris'});
  const onAffiliateSelected = function(affiliate) {
    assert.equal(affiliate, mockAffiliate);
  };
  let component = this.subject({onAffiliateSelected: onAffiliateSelected});
  Ember.run(() => {
    component.send('selectionChanged', mockAffiliate);
  });
});

test('it filters out the excludeUser from the list of affiliates', function(assert) {
  let excludeUser = Ember.Object.create({ id: 'user-123', username: 'affiliate-123' });
  let affiliates  = [
    Ember.Object.create({ uid: 'affiliate-123'}),
    Ember.Object.create({ uid: 'affiliate-456'})
  ];

  let component = this.subject({excludeUser: excludeUser, affiliates: affiliates});

  assert.equal(component.get('affiliates.length'), 2);
  assert.equal(component.get('filteredAffiliates.length'), 1);
  assert.equal(component.get('filteredAffiliates.firstObject.uid'), 'affiliate-456');
});

test('it filters out null names and emails from the list of affiliates', function(assert) {
  let affiliates = [
    Ember.Object.create({ uid: '1', fullName: 'John Smith', email: 'john@smith.org'}),
    Ember.Object.create({ uid: '2', fullName: null, email: 'john@smith.org'}),
    Ember.Object.create({ uid: '3', fullName: '(null)', email: 'john@smith.org'}),
    Ember.Object.create({ uid: '4', fullName: 'John Smith', email: null}),
  ];

  let component = this.subject({affiliates: affiliates});

  assert.equal(component.get('affiliates.length'), 4);
  assert.equal(component.get('filteredAffiliates.length'), 1);
  assert.equal(component.get('filteredAffiliates.firstObject.uid'), '1');
});
