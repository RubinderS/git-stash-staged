import {spawn} from 'cross-spawn';

export const runCommand = (cmd: string, args: string[]): Promise<string> => {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, {
      shell: true,
    });

    let childOutput = '';

    child.stdout.on('data', (data) => {
      childOutput += data;
    });

    child.on('close', (code: number) => {
      resolve(childOutput);
    });

    child.on('error', (err) => {
      reject(err);
    });
  });
};
