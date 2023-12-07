#!/usr/bin/env node

const { config } = require('dotenv');
const { resolve } = require('path');
const { exec } = require('child_process');

const path = process.argv[2];

console.log(`Loading env from ${path}`);

const { parsed } = config({ path: resolve(path) });

for (const variable in parsed) {
  exec(`export ${variable}="${parsed[variable]}"`);
}
