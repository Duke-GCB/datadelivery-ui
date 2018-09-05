import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('select-recipient-page', 'Integration | Component | select recipient page', {
  integration: true,
  setup() {
    this.container.lookup('router:main').setupRouter();
  }
});

test('it renders project name and back and forward button links', function(assert) {
  this.render(hbs`{{select-recipient-page projectName="myProject" 
                                          backRoute="deliveries.new.select-project" 
                                          nextRoute="deliveries.new.enter-user-message" 
                                          disableNext=true }}`);

  assert.equal(this.$('.project-name').text().trim(), 'myProject');
  assert.equal(this.$('.back-button').attr('href').trim(), '/deliveries/new/select-project');
  assert.equal(this.$('.next-button').attr('href').trim(), '/deliveries/new/enter-user-message');
});

test('it renders inner content', function(assert) {
  this.render(hbs`{{#select-recipient-page projectName="myProject" 
                                          backRoute="deliveries.new.select-project" 
                                          nextRoute="deliveries.new.enter-user-message" 
                                          disableNext=true }} 
                                          <span class="inner-content">Test</span>
                  {{/select-recipient-page}}`);

  assert.equal(this.$('.inner-content').text().trim(), 'Test');
});
