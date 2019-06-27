import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | delivery table', function(hooks) {
  setupRenderingTest(hooks);

  function removeMultipleSpacesAndNewlines(str) {
    return str.replace(/ +/g, ' ').replace(/\n/g, '');
  }

  test('it renders', async function(assert) {
    const transfers = [EmberObject.create({
      id: 3,
      project: {name: 'Taco'},
      fromUser: {fullName: 'Arthur Adamson', id: 1},
      toUsersNames: 'Zelda Zellington',
      toUsers: [EmberObject.create({id: 26})],
      status: 'pending'
    }), EmberObject.create({
      id: 2,
      project: {name: 'Burger'},
      fromUser: {fullName: 'Zelda Zellington', id: 26},
      toUsersNames: 'Arthur Adamson',
      toUsers: [EmberObject.create({id: 1})],
      status: 'accepted'
    }), EmberObject.create({
      id: 3,
      project: {name: 'Pizza'},
      fromUser: {fullName: 'Arthur Adamson', id: 1},
      toUsersNames: 'Zelda Zellington',
      toUsers: [EmberObject.create({id: 26})],
      status: 'rejected'

    })];
    const currentUser = EmberObject.create({ id: 1 });
    const currentDukeDsUser = EmberObject.create({ id: 1 });
    this.set('transfers', transfers);
    this.set('currentUser', currentUser);
    this.set('currentDukeDsUser', currentDukeDsUser);

    await render(
      hbs`{{delivery-table transfers=transfers currentUser=currentUser currentDukeDsUser=currentDukeDsUser}}`
    );

    assert.equal(this.$('table').length, 2); // 2 tables
    assert.equal(this.$('thead tr').length, 4); // 2 header (label and search box)
    assert.equal(this.$('tbody:eq(0) tr').length, 2); // 1 row in outgoing
    assert.equal(this.$('tbody:eq(1) tr').length, 1); // 2 rows in incoming
    assert.equal(this.$('tbody tr a').length, 3); // each row should be selectable

    // displays expected column names for outgoing
    const outgoingColumnNames = removeMultipleSpacesAndNewlines(this.$('thead:eq(0) tr:eq(0) th').text().trim());
    assert.equal(outgoingColumnNames , 'Project Name   To   State');
    // Displays filter options
    assert.equal(this.$('thead:eq(0) select option').length, 5);

    // displays expected column names for incoming
    const incomingColumnNames = removeMultipleSpacesAndNewlines(this.$('thead:eq(1) tr:eq(0) th').text().trim());
    assert.equal(incomingColumnNames, 'Project Name   From   State');
    // Displays filter options
    assert.equal(this.$('thead:eq(1) select option').length, 5);

    // displays expected fields for outgoing
    const outgoingField1 = removeMultipleSpacesAndNewlines(this.$('tbody:eq(0) tr td').eq(0).text().trim());
    assert.equal(outgoingField1 , 'Taco');
    const outgoingField2 = removeMultipleSpacesAndNewlines(this.$('tbody:eq(0) tr td').eq(1).text().trim());
    assert.equal(outgoingField2, 'Zelda Zellington');
    const outgoingField3 = removeMultipleSpacesAndNewlines(this.$('tbody:eq(0) tr td').eq(2).text().trim());
    assert.equal(outgoingField3, 'Pending');

    // displays expected fields for incoming
    const incomingField1 = removeMultipleSpacesAndNewlines(this.$('tbody:eq(1) tr td').eq(0).text().trim());
    assert.equal(incomingField1 , 'Burger');
    const incomingField2 = removeMultipleSpacesAndNewlines(this.$('tbody:eq(1) tr td').eq(1).text().trim());
    assert.equal(incomingField2, 'Zelda Zellington');
    const incomingField3 = removeMultipleSpacesAndNewlines(this.$('tbody:eq(1) tr td').eq(2).text().trim());
    assert.equal(incomingField3, 'Accepted');
  });

  test('it renders new delivery link', async function(assert) {
    const transfers = [EmberObject.create({
      id: 3,
      project: {name: 'Taco'},
      fromUser: {fullName: 'Arthur Adamson', id: 1},
      toUsersNames: 'Zelda Zellington',
      toUsers: [EmberObject.create({id: 26})],
      status: 'pending'
    }), EmberObject.create({
      id: 2,
      project: {name: 'Burger'},
      fromUser: {fullName: 'Zelda Zellington', id: 26},
      toUsersNames: 'Arthur Adamson',
      toUsers: [EmberObject.create({id: 1})],
      status: 'accepted'
    }), EmberObject.create({
      id: 3,
      project: {name: 'Pizza'},
      fromUser: {fullName: 'Arthur Adamson', id: 1},
      toUsersNames: 'Zelda Zellington',
      toUsers: [EmberObject.create({id: 26})],
      status: 'rejected'

    })];
    const currentUser = EmberObject.create({ id: 1});
    const currentDukeDsUser = EmberObject.create({ id: 1});
    this.set('transfers', transfers);
    this.set('currentUser', currentUser);
    this.set('currentDukeDsUser', currentDukeDsUser);

    await render(
      hbs`{{delivery-table transfers=transfers currentUser=currentUser currentDukeDsUser=currentDukeDsUser}}`
    );

    assert.equal(this.$('.new-delivery-button').text(), 'New Delivery');
    assert.equal(this.$('.email-setup-warning-anchor').text(), '');
  });
});
