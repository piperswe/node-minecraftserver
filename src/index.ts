import { promisify } from 'util';
import { stat, Stats, createWriteStream } from 'fs';
import { join } from 'path';
import * as Bluebird from 'bluebird';
import { get } from 'request';
import mkdirp from 'mkdirp-promise';

const statAsync
  : (directory: string) => Promise<Stats>
  = <(directory: string) => Promise<Stats>> promisify(stat);

function download(url: string, to: string): Promise<void> {
  return new Bluebird((resolve, reject) => {
    const stream = get(url);
    stream.on('end', resolve);
    stream.on('error', reject);
    stream.pipe(createWriteStream(to));
  });
}

export interface MinecraftServerConfig {
  directory: string;
  jarURL: string;
  ram: number; // In megabytes
}

export class MinecraftServer {
  private config: MinecraftServerConfig;

  constructor(config: MinecraftServerConfig) {
    this.config = config;
  }

  async run() {
    const directoryStats = await statAsync(this.config.directory);
    if (!directoryStats.isDirectory() && directoryStats.isFile()) {
      throw new Error(`${ this.config.directory } already exists but isn't a directory`);
    } else if (!directoryStats.isDirectory()) {
      await mkdirp(this.config.directory);
    }

    const jarFile = join(this.config.directory, 'minecraft.jar');
    const jarStats = await statAsync(jarFile);
    if (!jarStats.isFile()) {
      await download(this.config.jarURL, jarFile);
    }
  }
}
