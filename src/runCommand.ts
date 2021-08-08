import {spawn} from 'cross-spawn';

export const runCommand = (
  cmd: string,
  args?: string[],
  dir?: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, {
      shell: true,
      cwd: dir,
    });

    let childOutput = '';

    child.stdout.on('data', (data) => {
      childOutput += data;
    });

    child.on('close', (_code: number) => {
      resolve(childOutput);
    });

    child.on('error', (err) => {
      reject(err);
    });
  });
};
