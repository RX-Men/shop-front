import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ngCli = join(__dirname, '../node_modules/@angular/cli/bin/ng.js');

const REQUIRED_ENV_KEYS = [
  'VITE_CTP_PROJECT_KEY',
  'VITE_CTP_CLIENT_ID',
  'VITE_CTP_CLIENT_SECRET',
  'VITE_CTP_AUTH_URL',
  'VITE_CTP_API_URL',
  'VITE_CTP_SCOPES',
];

const missingKeys = REQUIRED_ENV_KEYS.filter((key) => !process.env[key]);

if (missingKeys.length > 0) {
  console.error(
    [
      'Missing required environment variables:',
      missingKeys.join(', '),
      '',
      'Create a local .env file from .env.example or set the variables in your shell.',
    ].join('\n'),
  );
  process.exit(1);
}

const defineArgs = REQUIRED_ENV_KEYS.flatMap((key) => [
  '--define',
  `import.meta.env.${key}=${JSON.stringify(process.env[key])}`,
]);

const buildArgs = ['build', ...defineArgs, ...process.argv.slice(2)];

const result = spawnSync(process.execPath, [ngCli, ...buildArgs], {
  stdio: 'inherit',
  env: process.env,
});

process.exit(result.status ?? 1);
