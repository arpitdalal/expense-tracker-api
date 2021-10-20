import './env';
import path from 'path';
import fs from 'fs';
import pino from 'pino';
import { multistream } from 'pino-multi-stream';

type Streams = {
  stream: (NodeJS.WriteStream & { fd: 1 }) | fs.WriteStream;
}[];

const root = path.normalize(__dirname + '/../..');

let streams: Streams = [];

if (process.env.NODE_ENV === 'production') {
  streams = [
    { stream: process.stdout },
    { stream: fs.createWriteStream(`${root}/.log`, { flags: 'a' }) },
  ];
} else {
  streams = [{ stream: process.stdout }];
}

const l = pino(
  {
    name: process.env.APP_ID,
    level: process.env.LOG_LEVEL,
    prettyPrint: {
      colorize: true,
      levelFirst: true,
      translateTime: 'yyyy-mm-dd, h:MM:ss TT',
    },
  },
  multistream(streams)
);

export default l;
