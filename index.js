#!/usr/bin/env node

'use strict';

const program = require('commander');
const packagejson = require('./package.json');
const app = require('./app');

program
	.version(packagejson.version);

program
	.command('list')
	.description('Retrieve all the games from the database')
	.alias('l')
	.option('-p, --platform')
	.action((options) => {
		if (options.platform) {
			app.getCollectionPerPlatform();
		}
		else {
			app.getCollection();
		}
	});

program
	.command('add <game>')
	.description('Search for a game and add it to the database')
	.alias('a')
	.action((game) => {
		app.addGame(game);
	});

program
	.command('remove <game>')
	.description('Remove a game from the database')
	.alias('rm')
	.action((game) => {
		app.removeGame(game);
	});

program.parse(process.argv);
