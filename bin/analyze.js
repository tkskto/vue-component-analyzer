#!/usr/bin/env node

import {analyzeFromCLI} from '../dist/index.mjs';

/**
 * Catch and report unexpected error.
 * @param {any} error The thrown error object.
 * @returns {void}
 */
function onCatchError(error) {
  console.error('Something went wrong. component-analyzer. follow error message.');
  console.error(`${error.message}`);

  process.exit(1);
}

(async function main() {
  process.on('uncaughtException', onCatchError);
  process.on('unhandledRejection', onCatchError);

  try {
    await analyzeFromCLI();
  } catch (err) {
    onCatchError(err);
  }
}());
