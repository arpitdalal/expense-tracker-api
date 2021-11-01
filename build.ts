import s from 'shelljs';
import config from './tsconfig.json';
const outDir = config.compilerOptions.outDir;

s.rm('-rf', outDir);
s.mkdir(outDir);
s.mkdir('-p', `${outDir}/common/swagger`);
s.cp('server/common/swagger-config.yml', `${outDir}/common/swagger-config.yml`);
s.cp('server/common/v1.api.yml', `${outDir}/common/v1.api.yml`);
s.cp('server/common/v2.api.yml', `${outDir}/common/v2.api.yml`);
