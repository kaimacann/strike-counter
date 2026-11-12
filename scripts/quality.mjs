import { runQualityFromCfg } from '@terra-symposium/standards-quality/cli';
import { fileURLToPath } from 'node:url';

runQualityFromCfg(fileURLToPath(new URL('../config/quality.json', import.meta.url)), process.argv.slice(2));
