#!/usr/bin/env node

'use strict';

const program = require('commander');
const packagejson = require('./package.json');
const app = require('./app');
const labels = require('./labels');
const utils = require('./utils');

program
	.version(packagejson.version);

program
	.command('list')
	.description(labels.program.list)
	.option('-p, --platform')
	.action((options) => {
		options.platform ? app.getCollectionPerPlatform() : app.getCollection();
	});

program
	.command('add <game>')
	.description(labels.program.add)
	.action(() => {
		app.addGame(utils.multipleWordsInput(process.argv));
	});

program
	.command('remove <game>')
	.description(labels.program.remove)
	.alias('rm')
	.action(() => {
		app.removeGame(utils.multipleWordsInput(process.argv));
	});

program
	.command('repair')
	.description(labels.program.repair)
	.alias('rp')
	.action(() => {
		app.repair();
	});

program
	.command('export')
	.description(labels.program.export)
	.alias('ex')
	.action(() => {
		app.export();
	});

program
	.command('import')
	.description(labels.program.import)
	.alias('im')
	.action(() => {
		app.import();
	});

program.parse(process.argv);

if (!program.args.length) {
	program.help();
}
