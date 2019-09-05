const fs = require('fs');
const path = require('path');
const hostCwd = process.cwd();
const command = 'docker';
const args = [
    'run',
    '-v', `${hostCwd}/games/doom/:/work`,
    '-v', `${hostCwd}/build-games/doom:/build`,
    'fredrikaleksander/browser-arcade-toolchain:latest',
    '/bin/bash', '-c', 'cd /build && emcmake cmake -DCMAKE_BUILD_TYPE=Release /work && emmake make crispybrowser-doom crispybrowser-heretic crispybrowser-hexen crispybrowser-strife'
];

function createDir(p) {
    if(fs.existsSync(p))
        return;
    var parent = path.dirname(p);
    createDir(parent);
    fs.mkdirSync(p);
}

createDir(`${hostCwd}/build-games/doom`);
createDir(`${hostCwd}/src/games/doom`);

const { spawn } = require('child_process');
const child = spawn(command, args);

// use child.stdout.setEncoding('utf8'); if you want text chunks
child.stdout.pipe(process.stdout);

// since these are streams, you can pipe them elsewhere
child.stderr.pipe(process.stderr);

child.on('close', (code) => {
  if(code === 0) {
      ['crispybrowser-doom', 'crispybrowser-heretic', 'crispybrowser-hexen', 'crispybrowser-strife'].forEach(name => {
          fs.copyFileSync(`${hostCwd}/build-games/doom/src/${name}.js`, `${hostCwd}/src/games/doom/${name}.js`);
          fs.copyFileSync(`${hostCwd}/build-games/doom/src/${name}.wasm`, `${hostCwd}/src/games/doom/${name}.wasm`);
      });
  }

  process.exit(code);
});