#!/usr/bin/env node

"use strict";

/**
 * Catch and report unexpected error.
 * @param {any} error The thrown error object.
 * @returns {void}
 */
function onCatchError(error) {
  process.exitCode = 1;

  const {version} = require("../package.json");

  console.error(`Something went wrong. component-analyzer: ${version}`);
}

(async function main() {
  process.on("uncaughtException", onCatchError);
  process.on("unhandledRejection", onCatchError);

  // Otherwise, call the CLI.
  process.exitCode = await require("../dist/cli").analyze(
    process.argv,
  );
}()).catch(onCatchError);
