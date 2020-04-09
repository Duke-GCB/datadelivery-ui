import { run } from '@ember/runloop';
import { resolve } from 'rsvp';
import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Component | duke ds auth provider affiliate search', function(hooks) {
  setupTest(hooks);

  test('it queries the store on doSearch and sets affiliates', function(assert) {
    const mockAffiliates = ['user1', 'user2','user3'];
    const mockStore = EmberObject.create({
      query(modelName, params) {
        assert.equal(modelName, 'duke-ds-auth-provider-affiliate');
        assert.deepEqual(params, {email: 'user@example.com'});
        return resolve(mockAffiliates);
      }
    });
    let component = this.owner.factoryFor('component:duke-ds-auth-provider-affiliate-search').create({store: mockStore});
    component.didReceiveAttrs();
    // Initially users should be empty
    assert.deepEqual(component.get('affiliates'), []);

    // Send the action in a loop
    run(() => {
      component.send('doSearch', {email: 'user@example.com'});
    });

    // doSearch should set the results to component.users
    assert.deepEqual(component.get('affiliates'), mockAffiliates);
  });

  test('it clears selected affiliates on doSearch', function(assert) {
    let component = this.owner.factoryFor('component:duke-ds-auth-provider-affiliate-search').create({store: EmberObject.create({query() { return resolve(); }})});
    component.set('selectedAffiliates', [1]);
    assert.equal(component.get('selectedAffiliates.length'), 1);
    // Send the action in a loop
    run(() => { component.send('doSearch'); });
    assert.equal(component.get('selectedAffiliates.length'), 0);
  });

  test('it sends onAffiliateSelected when receiving selectionChanged', function(assert) {
    assert.expect(1);
    const mockAffiliate = EmberObject.create({name: 'Chris'});
    const mockUser = EmberObject.create({name: 'chris'});
    mockAffiliate.getOrRegisterUser = function() {
      return resolve(mockUser);
    };
    const onAffiliateSelected = function(affiliate) {
      assert.equal(affiliate, mockUser);
    };
    let component = this.owner.factoryFor('component:duke-ds-auth-provider-affiliate-search').create({onAffiliateSelected: onAffiliateSelected});
    run(() => {
      component.send('selectionChanged', [mockAffiliate]);
    });
  });

  test('it filters out the excludeUsers from the list of affiliates', function(assert) {
    let excludeUser = EmberObject.create({ id: 'user-123', username: 'affiliate-123' });
    let affiliates  = [
      EmberObject.create({ uid: 'affiliate-123'}),
      EmberObject.create({ uid: 'affiliate-456'})
    ];

    let component = this.owner.factoryFor('component:duke-ds-auth-provider-affiliate-search').create({
      excludeUsers: [excludeUser], affiliates: affiliates
    });

    assert.equal(component.get('affiliates.length'), 2);
    assert.equal(component.get('filteredAffiliates.length'), 1);
    assert.equal(component.get('filteredAffiliates.firstObject.uid'), 'affiliate-456');
  });

  test('it filters out null names and emails from the list of affiliates', function(assert) {
    let affiliates = [
      EmberObject.create({ uid: '1', fullName: 'John Smith', email: 'john@smith.org'}),
      EmberObject.create({ uid: '2', fullName: null, email: 'john@smith.org'}),
      EmberObject.create({ uid: '3', fullName: '(null)', email: 'john@smith.org'}),
      EmberObject.create({ uid: '4', fullName: 'John Smith', email: null}),
    ];

    let component = this.owner.factoryFor('component:duke-ds-auth-provider-affiliate-search').create({affiliates: affiliates});

    assert.equal(component.get('affiliates.length'), 4);
    assert.equal(component.get('filteredAffiliates.length'), 1);
    assert.equal(component.get('filteredAffiliates.firstObject.uid'), '1');
  });
});
