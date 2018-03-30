const HEADER_FIELD_SEPERATOR = ':';

function getEmailHeaderAndBody(value) {
  /**
   * Separates body and header in email value (https://tools.ietf.org/html/rfc7230#section-3)
   *returns a object containing the body as str and header as a dictionary
   */
  var header = {};
  var body = '';
  var inBody = false;
  if (value) {
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
  }
  return {
    header: header,
    body: body
  };
}


function getOptionalHeaderLine(headerDict, name) {
  /**
   * Creates a header line using headerDict using name or '' if not in dict
   */
  var value = headerDict[name];
  if (value) {
    return name + HEADER_FIELD_SEPERATOR + value + '\n';
  }
  return '';
}


function formatEmailText(value) {
  /**
   * Strips header from email text with the exception of Subject, From, To and Date
   */
  const headerFields = ['Subject', 'Date'];
  var headerAndBody = getEmailHeaderAndBody(value);
  var result = '';
  headerFields.forEach(function (headerFieldName) {
    result += getOptionalHeaderLine(headerAndBody.header, headerFieldName);
  });
  result += '\n';
  result += headerAndBody.body;
  return result;
}


export {formatEmailText, getEmailHeaderAndBody, getOptionalHeaderLine}
