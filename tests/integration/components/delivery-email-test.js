import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | delivery email', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders simple header and body', async function(assert) {

    await render(hbs`{{delivery-email 'Subject: Lunch
    
data'}}`);
    assert.equal(find('.delivery-email').innerHTML.trim(), 'Subject: Lunch<br><br>data<br>');
  });

  test('it renders four header fields and body', async function(assert) {

    await render(hbs`{{delivery-email 'Subject: Lunch
From: joe@joe.joe
To: bob@bob.bob
Date: Jan 2 2019 12:30
  
Hey,
When do you want to eat lunch?
-joe'}}`);
    assert.equal(find('.delivery-email').innerHTML.trim(), `Subject: Lunch<br>Date: Jan 2 2019 12:30<br><br>Hey,<br>When do you want to eat lunch?<br>-joe<br>`);
  });

  test('it skips unknown header lines', async function(assert) {
    await render(hbs`{{delivery-email 'Subject: Eat Lunch
Junk: Lunch

Hey,
When do you want to eat lunch?
-joe'}}`);
    assert.equal(find('.delivery-email').innerHTML.trim(), `Subject: Eat Lunch<br><br>Hey,<br>When do you want to eat lunch?<br>-joe<br>`)
  });
});
