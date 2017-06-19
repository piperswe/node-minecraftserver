import { spawn, ChildProcess } from 'child_process';
import { Writable, Readable } from 'stream';

export interface JavaConfig {
  Xmx: number; // In megabytes
  Xms: number; // In megabytes
}

export class JavaProcess {
  public stdout: Readable;
  public stderr: Readable;
  public stdin: Writable;
  private process: ChildProcess;

  constructor(process: ChildProcess) {
    this.stdout = process.stdout;
    this.stderr = process.stderr;
    this.stdin = process.stdin;
    this.process = process;
  }

  stop() {
    this.process.kill('SIGINT');
  }
}

export function executeJar(config: JavaConfig, workingDir: string, jar: string, args: Array<string> = []): JavaProcess {
  const spawnArgs = [];
  if (config.Xms) {
    spawnArgs.push(`-Xms${ config.Xms }M`);
  }
  if (config.Xmx) {
    spawnArgs.push(`-Xmx${ config.Xmx }M`);
  }
  spawnArgs.push('-jar');
  spawnArgs.push(jar);
  const process = spawn('java', [ ...spawnArgs, ...args ], {
    cwd: workingDir,
  });
  return new JavaProcess(process);
}
