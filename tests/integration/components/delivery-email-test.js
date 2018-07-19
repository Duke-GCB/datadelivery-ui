import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('email-textarea', 'Integration | Component | delivery email', {
  integration: true
});

test('it renders simple header and body', function(assert) {

  this.render(hbs`{{delivery-email 'Subject: Lunch
  
data'}}`);
  assert.equal(this.$('.delivery-email').html().trim(), 'Subject: Lunch<br><br>data<br>');
});

test('it renders four header fields and body', function(assert) {

  this.render(hbs`{{delivery-email value='Subject: Lunch
From: joe@joe.joe
To: bob@bob.bob
Date: Jan 2 2019 12:30
  
Hey,
When do you want to eat lunch?
-joe'}}`);
  assert.equal(this.$('.delivery-email').html().trim(), `Subject: Lunch<br>Date: Jan 2 2019 12:30<br><br>Hey,<br>When do you want to eat lunch?<br>-joe<br>`);
});

test('it skips unknown header lines', function(assert) {
  this.render(hbs`{{delivery-email value='Subject: Eat Lunch
Junk: Lunch

Hey,
When do you want to eat lunch?
-joe'}}`);
  assert.equal(this.$('.delivery-email').html().trim(), `Subject: Eat Lunch<br><br>Hey,<br>When do you want to eat lunch?<br>-joe<br>`)
});
