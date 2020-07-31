import EmberObject from '@ember/object';
import ProjectSummaryFetcherMixin from 'datadelivery-ui/mixins/project-summary-fetcher';
import { module, test } from 'qunit';

module('Unit | Mixin | project-summary-fetcher', function() {
  test('it sets ddsProjectSummary for a ddsProject', async function (assert) {
    let ProjectSummaryFetcherObject = EmberObject.extend(ProjectSummaryFetcherMixin);
    let subject = ProjectSummaryFetcherObject.create({
      ddsProjectSummary: null,
      ddsProject: EmberObject.create({isLoaded: true, getSummary() { return { 'summary': 123}}}),
    });
    await subject.fetchSummary();
    assert.deepEqual(subject.get('ddsProjectSummary'), { 'summary': 123});
  });
});
