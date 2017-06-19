import { createWriteStream } from 'fs';
import { get } from 'request';

export function download(url: string, to: string): Promise<{}> {
  return new Promise((resolve, reject) => {
    const stream = get(url);
    stream.on('end', resolve);
    stream.on('error', reject);
    stream.pipe(createWriteStream(to));
  });
}
