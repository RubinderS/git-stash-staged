import {NodeSimpleCLI, ErrorType, createFlags} from 'nodesimplecli';

const flags = createFlags({
  message: {
    flag: '--message',
    alias: '-m',
    description: 'stash message',
    argument: true,
  },
  keepFiles: {
    flag: '--keep',
    alias: '-k',
    description: 'keep files in index after staging',
  },
});

const onError = (err: ErrorType) => {
  process.stdout.write(err.display);
  process.exit(1);
};

export const cli = (args: string[]) => {
  return new NodeSimpleCLI('git-stash-staged', process.env.version).parse(
    args,
    flags,
    onError
  );
};
