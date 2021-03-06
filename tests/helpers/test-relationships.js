import { get } from '@ember/object';
import { test } from 'qunit';

function testRelationship(modelName, rel) {
  test(`it has relationship: ${rel.kind} ${rel.type}`, function(assert) {
    const Model = this.owner.lookup('service:store').modelFor(modelName);
    const relationship = get(Model, 'relationshipsByName').get(rel.key);
    assert.equal(relationship.key, rel.key, `has relationship with ${rel.type}`);
    assert.equal(relationship.kind, rel.kind, `kind of relationship is ${rel.kind}`);
    assert.equal(relationship.type, rel.type, `Type of related object is ${rel.type}`);
  });
}

function testRelationships(modelName, relationships) {
  relationships.forEach(function(rel) {
    testRelationship(modelName, rel);
  });
}

export {
  testRelationship,
  testRelationships
};

export default testRelationships;
