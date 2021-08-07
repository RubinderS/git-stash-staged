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
  const tempStashMessage = Date.now().toString();

  const stagedStashMessage = cliOptions.message
    ? cliOptions.message.replace(/\s+/g, '_')
    : Date.now().toString();

  const currentStaged = await runCommand('git', ['diff', '--cached'], dir);
  const stagedFiles = parseFilePathsFromDiff(currentStaged);

  await runCommand(
    'git',
    ['stash', '--keep-index', '-m', tempStashMessage],
    dir,
  );

  await runCommand('git', ['stash', '-m', stagedStashMessage], dir);
  await runCommand('git', ['stash', 'pop', 'stash@{1}'], dir);

  if (!cliOptions.keepFiles) {
    stagedFiles.forEach(async (file) => {
      await runCommand('git', ['restore', file], dir);
    });
  }
}

gitStashStaged(process.cwd());
