import { Stats, createWriteStream } from 'fs';
import { stat, writeFile } from './fsPromise';
import { join } from 'path';
import mkdirp from 'mkdirp-promise';
import Gamedig from 'gamedig';
import { download } from './net';
import { JavaProcess, executeJar } from './java';
import { ServerProperties, exportServerProperties } from './serverProperties';

export interface MinecraftServerConfig {
  directory: string;
  jarURL: string;
  ram: number; // In megabytes
  properties: ServerProperties;
}

export interface QueryResult {
  name: string;
  players: Array<string>;
  maxPlayers: number;
  version: string;
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

    // Make sure directory exists
    const directoryStats = await stat(this.config.directory);
    if (!directoryStats.isDirectory() && directoryStats.isFile()) {
      throw new Error(`${ this.config.directory } already exists but isn't a directory`);
    } else if (!directoryStats.isDirectory()) {
      await mkdirp(this.config.directory);
    }

    // Download jar file if it doesn't exist
    const jarFile = join(this.config.directory, 'minecraft.jar');
    const jarStats = await stat(jarFile);
    if (!jarStats.isFile()) {
      await download(this.config.jarURL, jarFile);
    }

    // Create server.properties file
    const serverPropertiesFile = join(this.config.directory, 'server.properties');
    await writeFile(serverPropertiesFile, exportServerProperties(this.config.properties));

    const process = executeJar({
      Xmx: this.config.ram,
      Xms: Math.floor(this.config.ram * (2 / 3)),
    }, this.config.directory, jarFile);
    this.process = process;
  }

  stop() {
    this.process.stop();
  }

  async query(): Promise<QueryResult> {
    // NOTE: When server.properties generation is implemented, this should
    // be modified to use server-ip and server-port.

    const query = await Gamedig.query({
      type: 'minecraftping',
      host: 'localhost',
      port: 25565,
    });

    return {
      name: query.name,
      players: query.players,
      maxPlayers: query.maxplayers,
      version: query.raw.version,
    };
  }

  async isOnline(): Promise<boolean> {
    try {
      await this.query();
      return true;
    } catch (e) {
      return false;
    }
  }
}
