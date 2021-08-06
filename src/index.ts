import {cli} from './cli';
import {runCommand} from './runCommand';

const cliOptions = cli(process.argv.slice(2));

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
  const tempStashMessage = Date.now();
  const stagedStashMessage = cliOptions.message ?? Date.now();

  const currentStaged = await runCommand('git', ['diff', '--cached'], dir);
  const stagedFiles = parseFilePathsFromDiff(currentStaged);

  await runCommand(
    'git',
    ['stash', '--keep-index', '-m', String(tempStashMessage)],
    dir,
  );

  await runCommand('git', ['stash', '-m', String(stagedStashMessage)], dir);
  await runCommand('git', ['stash', 'pop', 'stash@{1}'], dir);

  if (cliOptions.keepFiles) {
    stagedFiles.forEach(async (file) => {
      await runCommand('git', ['restore', file], dir);
    });
  }
}

gitStashStaged(process.cwd());
