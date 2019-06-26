#!/usr/bin/env node
'use strict';

const program = require('commander');
const readPkg = require('read-pkg');
const { expandConfig } = require('./utils');

async function main() {
  const pkg = await readPkg({ cwd: __dirname });

  program
    .version(pkg.version)
    .arguments('<config file>')
    .action((configFile) => {
      const args = expandConfig(configFile).join(' ');

      console.log(args);
    });

  program.parse(process.argv);
}

main();
