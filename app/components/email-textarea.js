import Ember from 'ember';

const HEADER_FIELD_SEPERATOR = ':';

function getEmailHeaderAndBody(value) {
  /**
   * Separates body and header in email value (https://tools.ietf.org/html/rfc7230#section-3)
   *returns a object containing the body as str and header as a dictionary
   */
  var header = {};
  var body = '';
  var inBody = false;
  value.split('\n').forEach(function (line) {
    if (!inBody && line.trim() == '') { // first CRLF by itself
      inBody = true;
    } else {
      if (inBody) {
        body += line + '\n';
      } else {
        const sepIdx = line.indexOf(HEADER_FIELD_SEPERATOR);
        if (sepIdx > -1) {
          const fieldName = line.substr(0, sepIdx);
          const fieldValue = line.substr(sepIdx + 1);

          header[fieldName] = fieldValue;
        }
      }
    }
  });
  return {
    header: header,
    body: body
  };
}

function formatEmailText(value) {
  /**
   * Strips header from email text with the exception of Subject, From, To and Date
   */
  const headerFields = ['Subject', 'From', 'To', 'Date'];
  var headerAndBody = getEmailHeaderAndBody(value);
  var result = '';
  headerFields.forEach(function (headerFieldName) {
    result += getOptionalHeaderLine(headerAndBody.header, headerFieldName);
  });
  result += '\n';
  result += headerAndBody.body;
  return result;
}

function getOptionalHeaderLine(header, name) {
  /**
   * Returns
   */
  var value = header[name];
  if (value) {
    return name + HEADER_FIELD_SEPERATOR + value + '\n';
  }
  return '';
}

export default Ember.Component.extend({
  tagName: 'textarea',
  classNames: ['form-control'],
  attributeBindings: ['readonly', 'rows'],
  readonly: true,
  value: null, //value to be displayed in the textarea
  rows: 2, // number of rows to show
  formattedValue: Ember.computed('value', function () {
    const value = this.get('value');
    return formatEmailText(value);
  })
});

