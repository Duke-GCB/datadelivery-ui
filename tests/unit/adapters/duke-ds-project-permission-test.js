import { moduleFor, test } from 'ember-qunit';

moduleFor('adapter:duke-ds-project-permission', 'Unit | Adapter | duke ds project permission', {
  // Specify the other units that are required for this test.
  needs: ['service:session']
});

test('it returns duke-ds-project permisions sub route for urlForQuery', function(assert) {
  let adapter = this.subject();
  let url = adapter.urlForQuery({project: 'project1'}, 'duke-ds-project-permission');
  assert.equal(url, 'http://testhost/duke-ds-projects/project1/permissions/')
});
