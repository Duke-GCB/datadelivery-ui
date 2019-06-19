import { test } from 'qunit';
import moduleForAcceptance from 'datadelivery-ui/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | visiting routes requiring login');

test('visiting /login does not require login', function(assert) {
  visit('/login');

  andThen(function() {
    assert.equal(currentURL(), '/login');
  });
});

test('visiting / does not require login', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
  });
});

test('visiting /deliveries requires login', function(assert) {
  visit('/deliveries');

  andThen(function() {
    assert.equal(currentURL(), '/login');
  });
});

test('visiting /deliveries/some-id requires login', function(assert) {
  visit('/deliveries/some-id');

  andThen(function() {
    assert.equal(currentURL(), '/login');
  });
});

test('visiting /deliveries/some-id/resend requires login', function (assert) {
  visit('/deliveries/some-id/resend');

  andThen(function() {
    assert.equal(currentURL(), '/login');
  });
});

test('visiting /duke-ds-projects requires login', function(assert) {
  visit('/duke-ds-projects');

  andThen(function() {
    assert.equal(currentURL(), '/login');
  });
});

test('visiting /duke-ds-projects/some-id requires login', function(assert) {
  visit('/duke-ds-projects/some-id');

  andThen(function() {
    assert.equal(currentURL(), '/login');
  });
});
