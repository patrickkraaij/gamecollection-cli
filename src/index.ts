#!/usr/bin/env node

import commander from 'commander';
import { multipleWordsInput } from './utils';
import { labels } from './constants';
import { getCollection, addGame, removeGame } from './collection';
import { importCollection, exportCollection, refreshGamesFromExport } from './manage';

const program = new commander.Command();
// program.version(require('./package.json').version);

program
  .command('list')
  .description(labels.program.list)
  .action(() => {
    getCollection();
  });

program
  .command('add <game>')
  .description(labels.program.add)
  .action(() => {
    addGame(multipleWordsInput(process.argv));
  });

program
  .command('remove <game>')
  .description(labels.program.remove)
  .alias('rm')
  .action(() => {
    removeGame(multipleWordsInput(process.argv));
  });

program
  .command('export')
  .description(labels.program.export)
  .alias('ex')
  .action(() => {
    exportCollection();
  });

program
  .command('import')
  .description(labels.program.import)
  .alias('im')
  .action(() => {
    importCollection();
  });

  program
  .command('importnew')
  .description('refresh')
  .alias('imnew')
  .action(() => {
    refreshGamesFromExport();
  });

program.parse(process.argv);
