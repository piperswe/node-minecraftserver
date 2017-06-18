import { createWriteStream } from 'fs';
import * as Bluebird from 'bluebird';
import { get } from 'request';

export function download(url: string, to: string): Promise<void> {
  return new Bluebird((resolve, reject) => {
    const stream = get(url);
    stream.on('end', resolve);
    stream.on('error', reject);
    stream.pipe(createWriteStream(to));
  });
}
