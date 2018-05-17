'use strict';

const chalk = require('chalk');
const inquirer = require('inquirer');

module.exports = {
	multipleWordsInput: (input) => {
		// node index.js add Super Mario World returns Super Mario World
		return input.splice(3).join(' ');
	},
	calculateGames: (games) => {
		return console.log(chalk.cyan(games.length) + ' games in your collection');
	},
	noGamesFound: () => {
		return console.warn(chalk.dim('No games found'));
	},
	gameAdded: (game) => {
		return console.log(chalk.yellow(chalk.bold(game) + ' inserted into your game collection.'));
	},
	gameRemoved: (game) => {
		return console.log(chalk.yellow(chalk.bold(game) + ' removed from your game collection.'));
	},
	pleaseEnterName: () => {
		return console.error(chalk.red('Could not complete your request, please enter a name for a game'));
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
	}
};
