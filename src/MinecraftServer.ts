import { Stats, createWriteStream } from 'fs';
import { stat } from './fsPromise';
import { join } from 'path';
import mkdirp from 'mkdirp-promise';
import { download } from './net';

export interface MinecraftServerConfig {
  directory: string;
  jarURL: string;
  ram: number; // In megabytes
}

export default class MinecraftServer {
  private config: MinecraftServerConfig;

  constructor(config: MinecraftServerConfig) {
    this.config = config;
  }

  async run() {
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
  }
}
