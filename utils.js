'use strict';

const dargs = require('dargs');
const fs = require('fs');
const path = require('path');

function buildConfig(rawConfig, combine) {
  const config = { ...rawConfig };

  combine.forEach((field) => {
    if (field in config && Array.isArray(config[field])) {
      config[field] = `"${config[field].join(',')}"`;
    }
  });

  return config;
}

function expandConfig(configFile) {
  const rawConfig = JSON.parse(
    fs.readFileSync(path.resolve(process.cwd(), configFile))
  );
  const { combine, ...options } = rawConfig['$'] || {};
  const config = buildConfig(rawConfig, combine || []);

  return dargs(config, options);
}

module.exports = {
  buildConfig,
  expandConfig,
};
