import { promisify } from 'util';
import { stat as fsStat, Stats } from 'fs';

export const stat
  : (directory: string) => Promise<Stats>
  = <(directory: string) => Promise<Stats>> promisify(fsStat);
