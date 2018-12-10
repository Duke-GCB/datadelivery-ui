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
