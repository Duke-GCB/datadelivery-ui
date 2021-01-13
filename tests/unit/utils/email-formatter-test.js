import {
  formatEmailText,
  getEmailHeaderAndBody,
  getOptionalHeaderLine
} from 'datadelivery-ui/utils/email-formatter';
import { module, test } from 'qunit';


module('Unit | Utility | email formatter', function() {
  // Replace this with your real tests.
  test('formatEmailText can format a simple email', function(assert) {
    var value = 'Subject: Mouse Data\n\nEmail Body';
    let result = formatEmailText(value);
    assert.equal(result.trim(), `Subject: Mouse Data

Email Body`);
  });

  test('formatEmailText can pull out all necessary header fields and filter out other header fields', function(assert) {
    var value = `To: joe@joe.joe
From: bob@bob.bob
Subject: Learn Something
HeaderJunk: Yep
Date: Jan 2 2018 12:45
MessageID: 123909123091233

Email Body
More Email Body`;
    let result = formatEmailText(value);
    assert.equal(result.trim(), `Subject: Learn Something
Date: Jan 2 2018 12:45

Email Body
More Email Body`);
  });

  test('getEmailHeaderAndBody can create dictionary from header lines and str from body', function(assert) {
    const result = getEmailHeaderAndBody(`From: Joe

bodyData
AnotherLine`);

    assert.equal(result.header.From.trim(), 'Joe')
    assert.equal(result.body.trim(), 'bodyData\nAnotherLine')
  });

  test('getOptionalHeaderLine returns empty string for items not in headerDict', function(assert) {
    const headerDict = {
      From: 'joe@joe.joe'
    };
    assert.equal(getOptionalHeaderLine(headerDict, 'Subject'), '');
  });

  test('getOptionalHeaderLine returns field and value joined together for items in headerDict', function(assert) {
    const headerDict = {
      From: ' joe@joe.joe'
    };
    assert.equal(getOptionalHeaderLine(headerDict, 'From'), 'From: joe@joe.joe\n');

  });
});
