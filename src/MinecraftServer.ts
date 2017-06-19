import { Stats, createWriteStream } from 'fs';
import { stat } from './fsPromise';
import { join } from 'path';
import mkdirp from 'mkdirp-promise';
import { download } from './net';
import { JavaProcess, executeJar } from './java';

export interface MinecraftServerConfig {
  directory: string;
  jarURL: string;
  ram: number; // In megabytes
}

export default class MinecraftServer {
  public process?: JavaProcess;
  private config: MinecraftServerConfig;

  constructor(config: MinecraftServerConfig) {
    this.config = config;
  }

  async run() {
    if (this.process) {
      throw new Error('Process already running.');
    }

    const directoryStats = await stat(this.config.directory);
    if (!directoryStats.isDirectory() && directoryStats.isFile()) {
      throw new Error(`${ this.config.directory } already exists but isn't a directory`);
    } else if (!directoryStats.isDirectory()) {
      await mkdirp(this.config.directory);
    }

    const jarFile = join(this.config.directory, 'minecraft.jar');
    const jarStats = await stat(jarFile);
    if (!jarStats.isFile()) {
      await download(this.config.jarURL, jarFile);
    }

    const process = executeJar({
      Xmx: this.config.ram,
      Xms: Math.floor(this.config.ram * (2 / 3)),
    }, this.config.directory, jarFile);
    this.process = process;
  }

  stop() {
    this.process.stop();
  }
}
