const fs = require('fs');
const path = require('path');
const packageJson = require('../package.json');
const hostCwd = process.cwd();
const command = 'docker';
const args = [
    'build',
    '-t', 'fredrikaleksander/browser-arcade:latest',
    '-t', `fredrikaleksander/browser-arcade:${packageJson.version}`,
    '.'
];

const { spawn } = require('child_process');
const child = spawn(command, args);

// use child.stdout.setEncoding('utf8'); if you want text chunks
child.stdout.pipe(process.stdout);

// since these are streams, you can pipe them elsewhere
child.stderr.pipe(process.stderr);

child.on('close', (code) => {
  if(code === 0) {
  }

  process.exit(code);
});