import { moduleFor, test } from 'ember-qunit';

moduleFor('adapter:duke-ds-project', 'Unit | Adapter | duke ds project', {
  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']
  needs: ['service:session']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let adapter = this.subject();
  assert.ok(adapter);
});
