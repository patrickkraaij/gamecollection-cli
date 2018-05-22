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
	noGamesFound: () => {
		return console.warn(chalk.dim(labels.warning.noGamesFound));
	},
	gameAdded: (game) => {
		return console.log(chalk.yellow(chalk.bold(game) + ` ${labels.log.insertedIntoCollection}`));
	},
	gameRemoved: (game) => {
		return console.log(chalk.yellow(chalk.bold(game) + ` ${labels.log.removedFromCollection}`));
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
