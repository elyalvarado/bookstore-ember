/* eslint-env node */

'use strict';

const path = require('path');

module.exports = function(/* env */) {
  return {
    clientAllowedKeys: ['BUGSNAG_API_KEY'],
    fastbootAllowedKeys: ['BUGSNAG_API_KEY'],
    failOnMissingKey: false,
    path: path.join(path.dirname(__dirname), '.env')
  }
};
