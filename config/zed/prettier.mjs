import prettier from 'prettier';
import { promisify } from 'node:util';
import config from '../.prettierrc.mjs';

const filepathIndex = process.argv.indexOf('--stdin-filepath');
const filepath = filepathIndex === -1 ? undefined : process.argv[filepathIndex + 1];

if (!filepath) {
	console.error('Missing --stdin-filepath.');
	process.exit(1);
}

let source = '';
process.stdin.setEncoding('utf8');
for await (const chunk of process.stdin) source += chunk;
const fmt = await prettier.format(source, { ...config, filepath });
const writeStdout = promisify(process.stdout.write.bind(process.stdout));
await writeStdout(fmt);
