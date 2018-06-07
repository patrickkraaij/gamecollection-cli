'use strict';

const chalk = require('chalk');
const inquirer = require('inquirer');
const labels = require('./labels');

module.exports = {
	multipleWordsInput: (input) => {
		// node index.js add Super Mario World returns Super Mario World
		return input.splice(3).join(' ');
	},
	calculateGames: (games) => {
		return console.log(chalk.cyan(games.length) + ` ${labels.log.gamesInCollection}`);
	},
	gameAdded: (game) => {
		return console.log(chalk.yellow(chalk.bold(game) + ` ${labels.log.insertedIntoCollection}`));
	},
	gameRemoved: (game) => {
		return console.log(chalk.yellow(chalk.bold(game) + ` ${labels.log.removedFromCollection}`));
	},
	console: (type, message, style) => {
		if (type === 'log') {
			console.log(
				style ? chalk[style](chalk.dim(message)) : chalk.dim(message)
			);
		}
		if (type === 'warning') {
			console.log(
				style ? chalk[style](chalk.yellow(message)) : chalk.yellow(message)
			);
		}
		if (type === 'success') {
			console.log(
				style ? chalk[style](chalk.green(message)) : chalk.green(message)
			);
		}
		if (type === 'error') {
			console.log(
				style ? chalk[style](chalk.red(message)) : chalk.red(message)
			);
		}
	},
	dialog: async (dialogType, dialogMessage, dialogName, dialogChoices, dialogPageSize, dialogNoSelectionMessage) => {
		return await inquirer.prompt([{
			type: dialogType,
			message: dialogMessage,
			name: dialogName,
			choices: dialogChoices,
			pageSize: dialogPageSize,
			validate: (answer) => {
				if (answer.length < 1) {
					return dialogNoSelectionMessage;
				}
				return true;
			}
		}]);
	},
	getMatchedGame: (gameFromDB, gamesFromAPI) => {
		for (const item of gamesFromAPI) {
			if (gameFromDB.title === item.title && gameFromDB.platform === item.platform) {
				module.exports.console('success', `${item.title} | ${item.platform}`);
				return item;
			}
		}

		module.exports.console('error', `${gameFromDB.title} | ${gameFromDB.platform}`);
		return null;
	}
};
