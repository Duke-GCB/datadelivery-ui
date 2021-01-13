import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import $ from 'jquery';

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

    assert.equal(findAll('table').length, 2); // 2 tables
    assert.equal(findAll('thead tr').length, 4); // 2 header (label and search box)
    assert.equal(findAll('tbody')[0].querySelectorAll('tr').length, 2); // 1 row in outgoing
    assert.equal(findAll('tbody')[1].querySelectorAll('tr').length, 1); // 1 rows in incoming
    assert.equal(findAll('tbody tr a').length, 3); // each row should be selectable

    // displays expected column names for outgoing
    const headerColumns = findAll('thead')[0].querySelectorAll('tr')[0].querySelectorAll('th');
    assert.equal(headerColumns.length, 3);
    assert.equal(headerColumns[0].textContent.trim(), 'Project Name');
    assert.equal(headerColumns[1].textContent.trim(), 'To');
    assert.equal(headerColumns[2].textContent.trim(), 'State');

    // Displays filter options
    assert.equal(findAll('thead')[0].querySelectorAll('option').length, 5);

    // displays expected column names for incoming
    const secondHeaderColumns = findAll('thead')[1].querySelectorAll('tr')[0].querySelectorAll('th');
    assert.equal(secondHeaderColumns.length, 3);
    assert.equal(secondHeaderColumns[0].textContent.trim(), 'Project Name');
    assert.equal(secondHeaderColumns[1].textContent.trim(), 'From');
    assert.equal(secondHeaderColumns[2].textContent.trim(), 'State');

    // Displays filter options
    assert.equal(findAll('thead')[1].querySelectorAll('option').length, 5);

    // displays expected fields for outgoing
    var tbody = findAll('tbody')[0];
    const outgoingField1 = removeMultipleSpacesAndNewlines($('tbody:eq(0) tr td').eq(0).text().trim());
    assert.equal(outgoingField1 , 'Taco');
    const outgoingField2 = removeMultipleSpacesAndNewlines($('tbody:eq(0) tr td').eq(1).text().trim());
    assert.equal(outgoingField2, 'Zelda Zellington');
    const outgoingField3 = removeMultipleSpacesAndNewlines($('tbody:eq(0) tr td').eq(2).text().trim());
    assert.equal(outgoingField3, 'Pending');

    // displays expected fields for incoming
    const incomingField1 = removeMultipleSpacesAndNewlines($('tbody:eq(1) tr td').eq(0).text().trim());
    assert.equal(incomingField1 , 'Burger');
    const incomingField2 = removeMultipleSpacesAndNewlines($('tbody:eq(1) tr td').eq(1).text().trim());
    assert.equal(incomingField2, 'Zelda Zellington');
    const incomingField3 = removeMultipleSpacesAndNewlines($('tbody:eq(1) tr td').eq(2).text().trim());
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

    assert.equal($('.new-delivery-button').text(), 'New Delivery');
    assert.equal($('.email-setup-warning-anchor').text(), '');
  });
});
