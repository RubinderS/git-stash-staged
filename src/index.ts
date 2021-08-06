import {runCommand} from './runCommand';

function parseFilePathsFromDiff(diff: string): string[] {
  const filePaths: string[] = [];
  const regex = new RegExp(/diff --git a\/(.*)\sb\//g);
  let regExpArr: RegExpExecArray | null;

  while ((regExpArr = regex.exec(diff))) {
    filePaths.push(regExpArr[1]);
  }

  return filePaths;
}

async function gitStashStaged(dir: string) {
  const badStashMessage = Date.now();
  const goodStashMessage = Date.now();

  const currentStaged = await runCommand('git', ['diff', '--cached']);
  const stagedFiles = parseFilePathsFromDiff(currentStaged);

  await runCommand('git', [
    'stash',
    '--keep-index',
    '-m',
    String(badStashMessage),
  ]);

  await runCommand('git', ['stash', '-m', String(goodStashMessage)]);
  await runCommand('git', ['stash', 'pop', 'stash@{1}']);

  if (process.argv[2] !== '--keep') {
    stagedFiles.forEach(async (file) => {
      await runCommand('git', ['restore', file]);
    });
  }
}

gitStashStaged(process.cwd());
