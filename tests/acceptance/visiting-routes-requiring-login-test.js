import { currentURL, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | visiting routes requiring login', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /login does not require login', async function(assert) {
    await visit('/login');

    assert.equal(currentURL(), '/login');
  });

  test('visiting / does not require login', async function(assert) {
    await visit('/');

    assert.equal(currentURL(), '/');
  });

  test('visiting /deliveries requires login', async function(assert) {
    await visit('/deliveries');

    assert.equal(currentURL(), '/login');
  });

  test('visiting /deliveries/some-id requires login', async function(assert) {
    await visit('/deliveries/some-id');

    assert.equal(currentURL(), '/login');
  });

  test('visiting /deliveries/some-id/resend requires login', async function(assert) {
    await visit('/deliveries/some-id/resend');

    assert.equal(currentURL(), '/login');
  });

  test('visiting /duke-ds-projects requires login', async function(assert) {
    await visit('/duke-ds-projects');

    assert.equal(currentURL(), '/login');
  });

  test('visiting /duke-ds-projects/some-id requires login', async function(assert) {
    await visit('/duke-ds-projects/some-id');

    assert.equal(currentURL(), '/login');
  });
});
