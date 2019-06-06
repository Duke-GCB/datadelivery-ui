import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('duke-ds-project-size', 'Integration | Component | duke ds project size', {
  integration: true
});

test('it fetches and renders summary', function (assert) {
  const summary = {
    total_size: 5 * 1024 * 1024 * 1024,
    file_count: 345,
    folder_count: 47
  };
  const ddsProject = Ember.Object.create({
    isLoaded: true,
    getSummary() {
      return Ember.RSVP.resolve(summary);
    }
  });
  this.set('ddsProject', ddsProject);
  this.render(hbs`{{duke-ds-project-size ddsProject}}`);
  assert.equal(this.$('.duke-ds-project-size').text().trim(), '5 GiB - 345 files, 47 folders');
});

test('it renders loading state while summary is null', function(assert) {
  const ddsProject = Ember.Object.create({
    isLoaded: true,
    getSummary() {
      return Ember.RSVP.resolve(null);
    }
  });
  this.set('ddsProject', ddsProject);
  this.render(hbs`{{duke-ds-project-size ddsProject}}`);
  assert.equal(this.$('.duke-ds-project-size').text().trim(), 'Calculating');
});
