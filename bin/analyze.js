#!/usr/bin/env node

/**
 * Catch and report unexpected error.
 * @param {any} error The thrown error object.
 * @returns {void}
 */
function onCatchError(error) {
  const {version} = require('../package.json');

  console.error(`Something went wrong. component-analyzer: ${version}. follow error message.`);
  console.error(`${error.message}`);

  process.exit(1);
}

(function main() {
  process.on('uncaughtException', onCatchError);
  process.on('unhandledRejection', onCatchError);

  try {
    require('../dist/index');
  } catch (err) {
    onCatchError(err);
  }
}());
