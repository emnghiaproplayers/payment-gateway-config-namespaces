import { registerAs } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';

let version = '0.0.1';
try {
  const packageJson = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'),
  );
  version = packageJson.version;
} catch {}

export default registerAs('app', () => ({
  name: process.env.APP_NAME,
  port: Number(process.env.APP_PORT),
  nodeEnv: process.env.NODE_ENV,
  version,
}));