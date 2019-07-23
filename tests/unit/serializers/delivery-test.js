import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Serializer | delivery', function(hooks) {
  setupTest(hooks);

  test('it converts belongsTo relationships to underscore and appends _id', function (assert) {
    let serializer = this.owner.lookup('serializer:delivery');
    const belongsToKey = serializer.keyForRelationship('fromUser', 'belongsTo');
    assert.equal(belongsToKey, 'from_user_id');
  });

  test('it converts hasMany relationships to underscore, singularizes, and appends _ids', function (assert) {
    let serializer = this.owner.lookup('serializer:delivery');
    const hasMany = serializer.keyForRelationship('shareUsers', 'hasMany');
    assert.equal(hasMany, 'share_user_ids');
  });

  test('it does not append anything to attributes', function (assert) {
    let serializer = this.owner.lookup('serializer:delivery');
    const attributeKey = serializer.keyForAttribute('userMessage');
    assert.equal(attributeKey, 'user_message');
  });
});
