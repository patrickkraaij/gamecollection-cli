'use strict';

const chalk = require('chalk');

module.exports = {
	multipleWordsInput: (input) => {
		// node index.js add Super Mario World returns Super Mario World
		return input.splice(3).join(' ');
	},
	calculateGames: (games) => {
		return console.log(chalk.cyan(games.length) + ' games in your collection');
	},
	connectedToDB: (db) => {
		return console.info(chalk.green('Connected to the database ' + chalk.bold(db.databaseName)));
	},
	noGamesFound: () => {
		return console.warn(chalk.dim('No games found'));
	},
	gameAdded: (game) => {
		return console.log(chalk.yellow(chalk.bold(game) + ' inserted into games collection.'));
	},
	gameRemoved: (game) => {
		return console.log(chalk.yellow(chalk.bold(game) + ' removed from games collection.'));
	},
	pleaseEnterName: () => {
		return console.error(chalk.red('Could not complete your request, please enter a name for a game'));
	}
};
