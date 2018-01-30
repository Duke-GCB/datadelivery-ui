import { moduleFor, test } from 'ember-qunit';

moduleFor('serializer:delivery', 'Unit | Serializer | delivery');

test('it converts relationship keys to underscore and appends _id', function (assert) {
  let serializer = this.subject();
  const relationshipKey = serializer.keyForRelationship('someRelationship');
  assert.equal(relationshipKey, 'some_relationship_id');
  const attributeKey = serializer.keyForAttribute('someAttribute');
  assert.equal(attributeKey, 'some_attribute');
});
