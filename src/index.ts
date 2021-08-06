import {runCommand} from './runCommand';

async function gitStashStaged(dir: string) {
  const badStashMessage = Date.now();
  const goodStashMessage = Date.now();

  await runCommand('git', [
    'stash',
    '--keep-index',
    '-m',
    String(badStashMessage),
  ]);

  await runCommand('git', ['stash', '-m', String(goodStashMessage)]);
  await runCommand('git', ['stash', 'pop', 'stash@{1}']);
}

gitStashStaged(process.cwd());
