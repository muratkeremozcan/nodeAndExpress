'use strict';

module.exports = function () {
  return {
    files: [
      './*.js',
    ],

    tests: [
      './*.js',
    ],

    env: {
      type: 'node'
    }
  };
};