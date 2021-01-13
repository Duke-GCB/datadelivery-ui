import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | delivery detail', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders brief mode', async function(assert) {
    const transfer = EmberObject.create({
      id: 5,
      project: EmberObject.create({name: 'Taco', isLoaded: true, getSummary() { return {}}}),
      fromUser: {fullName: 'Arthur Adamson'},
      toUsersNames: [ 'Zelda Zellington' ],
      status: 'Done',
      delivery: EmberObject.create({
        shareUsers: [
          {fullName: 'Bob Robertson'}
        ],
      })
    });

    this.set('transfer', transfer);
    await render(hbs`{{delivery-detail transfer brief=true}}`);
    assert.equal(this.element.querySelectorAll('.detail-label')[0].textContent, 'From');
    assert.equal(this.element.querySelectorAll('.detail-label')[1].textContent, 'To');
    assert.equal(findAll('.detail-label').length, 2);
  });

  test('it renders full mode', async function(assert) {
    const transfer = EmberObject.create({
      id: 5,
      canResend: true,
      project: EmberObject.create({name: 'Taco', isLoaded: true, getSummary() { return {}}}),
      fromUser: {fullName: 'Arthur Adamson'},
      toUsersNames: ['Zelda Zellington'],
      status: 'Done',
      lastUpdatedOn: "2020-01-02 12:30",
      delivery: EmberObject.create({
        id: 3,
        shareUsers: [
          {fullName: 'Bob Robertson'}
        ],
        userMessage: 'Here is your data',
        deliveryEmailText: 'Subject: New Data\n\nEmail Body'
      })
    });

    this.set('transfer', transfer);
    await render(hbs`{{delivery-detail transfer}}`);
    assert.equal(findAll('.detail-label').length, 4);
    var idx = 0;
    assert.equal(findAll('.detail-label')[idx].textContent.trim(), 'From');
    assert.equal(findAll('.detail-value')[idx].textContent.trim(), 'Arthur Adamson');
    idx += 1;
    assert.equal(findAll('.detail-label')[idx].textContent, 'To');
    assert.equal(findAll('.detail-value')[idx].textContent.trim(), 'Zelda Zellington');
    idx += 1;
    assert.equal(findAll('.detail-label')[idx].textContent, 'Status');
    assert.equal(findAll('.detail-value')[idx].textContent.trim(), 'Done - January 2, 2020 12:30 PM');
    idx += 1;
    assert.equal(findAll('.detail-label')[idx].textContent, 'Delivery Email');
    assert.equal(this.element.querySelector('.delivery-email').textContent.trim(), 'Subject: New DataEmail Body');
  });

  test('it renders full mode declineReason and performedBy', async function(assert) {
    const transfer = EmberObject.create({
        id: 5,
        project: EmberObject.create({name: 'Taco', isLoaded: true, getSummary() { return {}}}),
        fromUser: {fullName: 'Arthur Adamson'},
        toUsersNames: ['Zelda Zellington'],
        status: 'Done',
      delivery:  EmberObject.create({
        shareUsers: [
          {fullName: 'Bob Robertson'}
        ],
        userMessage: 'Here is your data',
        deliveryEmailText: 'Subject: Hello\n\nEmail Body',
        declineReason: 'Was not needed.',
        performedBy: 'John Doe'
      }),
    });
    this.set('transfer', transfer);
    await render(hbs`{{delivery-detail transfer}}`);
    assert.equal(findAll('.detail-label')[3].textContent, 'Decline Reason');
    assert.equal(findAll('.detail-value')[3].textContent.trim(), 'Was not needed.');
    assert.equal(findAll('.detail-label')[4].textContent, 'Performed By');
    assert.equal(findAll('.detail-value')[4].textContent.trim(), 'John Doe');
  });

  test('it handles an empty status date', async function(assert) {
    const transfer = EmberObject.create({
      id: 5,
      project: EmberObject.create({name: 'Taco', isLoaded: true, getSummary() { return {}}}),
      fromUser: {fullName: 'Arthur Adamson'},
      toUsersNames: [ 'Zelda Zellington' ],
      status: 'Done',
      delivery: EmberObject.create({
        shareUsers: [
          {fullName: 'Bob Robertson'}
        ],
      })
    });

    this.set('transfer', transfer);
    await render(hbs`{{delivery-detail transfer}}`);
    assert.equal(findAll('.detail-value')[2].textContent.trim(), 'Done');
  });

  test('it renders email when transfer is pending', async function(assert) {
    const transfer = EmberObject.create({
      id: 5,
      canResend: true,
      project: EmberObject.create({name: 'Taco', isLoaded: true, getSummary() { return {}}}),
      fromUser: {fullName: 'Arthur Adamson'},
      toUsersNames: [ 'Zelda Zellington' ],
      status: 'pending',
      delivery: EmberObject.create({
        deliveryEmailText: 'Subject: Hello\n\nEmail Body',
        shareUsers: [
          {fullName: 'Bob Robertson'}
        ],
      })
    });
    this.set('transfer', transfer);
    await render(hbs`{{delivery-detail transfer}}`);
    assert.equal(find('.delivery-email').innerHTML.trim(), 'Subject: Hello<br><br>Email Body<br>');
  });

  test('it does not render email when transfer is not pending', async function(assert) {
    const transfer = EmberObject.create({
      id: 5,
      canResend: false,
      project: EmberObject.create({name: 'Taco', isLoaded: true, getSummary() { return {}}}),
      fromUser: {fullName: 'Arthur Adamson'},
      toUsersNames: [ 'Zelda Zellington' ],
      status: 'pending',
      delivery: EmberObject.create({
        deliveryEmailText: 'Subject: Hello\n\nEmail Body',
        shareUsers: [
          {fullName: 'Bob Robertson'}
        ],
      })
    });
    this.set('transfer', transfer);
    await render(hbs`{{delivery-detail transfer}}`);
    assert.equal(find('.delivery-email'), null);
  });

  test('it renders project details when showProjectDetails=true', async function(assert) {
    const transfer = EmberObject.create({
      project: EmberObject.create({name: 'Taco', isLoaded: true, getSummary() { return {}}}),
      status: 'accepted',
    });
    this.set('transfer', transfer);
    this.set('showProjectDetails', true);
    await render(hbs`{{delivery-detail transfer showProjectDetails}}`);
    assert.equal(findAll('.project-details').length, 1);
  });

  test('it hides project details when showProjectDetails=false', async function(assert) {
    const transfer = EmberObject.create({
      status: 'accepted',
      project: EmberObject.create({name: 'Taco', isLoaded: true, getSummary() { return {}}}),
    });
    this.set('transfer', transfer);
    this.set('showProjectDetails', false);
    await render(hbs`{{delivery-detail transfer showProjectDetails}}`);
    assert.equal(findAll('.project-details').length, 0);
  });
});
