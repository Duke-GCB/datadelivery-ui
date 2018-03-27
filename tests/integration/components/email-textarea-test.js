import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('email-textarea', 'Integration | Component | email textarea', {
  integration: true
});

test('it renders simple header and body', function(assert) {

  this.render(hbs`{{email-textarea value='Subject: Lunch
  
data'}}`);
  assert.equal(this.$().text().trim(), 'Subject: Lunch\n\ndata');
});

test('it renders four header fields and body', function(assert) {

  this.render(hbs`{{email-textarea value='Subject: Lunch
From: joe@joe.joe
To: bob@bob.bob
Date: Jan 2 2019 12:30
  
Hey,
When do you want to eat lunch?
-joe'}}`);
  assert.equal(this.$().text().trim(), `Subject: Lunch
Date: Jan 2 2019 12:30

Hey,
When do you want to eat lunch?
-joe`);
});

test('it skips unknown header lines', function(assert) {
  this.render(hbs`{{email-textarea value='Subject: Eat Lunch
Junk: Lunch

Hey,
When do you want to eat lunch?
-joe'}}`);
  assert.equal(this.$().text().trim(), `Subject: Eat Lunch

Hey,
When do you want to eat lunch?
-joe`)
});
