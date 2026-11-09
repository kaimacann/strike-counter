import { runQualityFromCfg } from '@terra-symposium/quality/cli';
import { fileURLToPath } from 'node:url';
import { delimiter, resolve } from 'node:path';

process.env.PATH = `${resolve('node_modules/.bin')}${delimiter}${process.env.PATH ?? ''}`;
runQualityFromCfg(fileURLToPath(new URL('../config/quality.json', import.meta.url)), process.argv.slice(2));
