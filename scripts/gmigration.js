const args = require('minimist')(process.argv.slice(2));

const mn = args['mn'];

const execSync = require('child_process').execSync;
// import { execSync } from 'child_process';  // replace ^ if using ES modules

const output = execSync(
  `typeorm-ts-node-commonjs migration:generate -d src/infra/data-source.ts src/infra/postgres/migrations/${mn}`,
  { encoding: 'utf-8' },
); // the default is 'buffer'
console.log(output);
