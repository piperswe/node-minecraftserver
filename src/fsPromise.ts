import { promisify } from 'util';
import { stat as fsStat, writeFile as fsWriteFile, Stats } from 'fs';

export const stat
  : (directory: string) => Promise<Stats>
  = <(directory: string) => Promise<Stats>> promisify(fsStat);

export const writeFile
  : (path: string, data: string | Buffer) => Promise<{}>
  = <(path: string, data: string | Buffer) => Promise<{}>> promisify(fsWriteFile);
