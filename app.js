'use strict';

const Table = require('cli-table');
const thegamesdb = require('thegamesdb');
const gcdb = require('gamecollection-mongodb');
const utils = require('./utils');

module.exports = {
	getCollection: async () => {
		const result = await gcdb.getGames();

		let table = new Table({
			head: ['Title', 'Platform'],
			colWidths: [60, 40]
		});

		result.forEach((currentValue) => {
			table.push([currentValue.title, currentValue.platform]);
		});

		console.log(table.toString());
		utils.calculateGames(result);
	},
	getCollectionPerPlatform: async () => {
		const result = await gcdb.getGamesPerPlatform();
		let table;

		result.forEach((currentValue) => {
			table = new Table({
				head: [currentValue.platform],
				colWidths: [100]
			});

			currentValue.games.forEach((game) => {
				table.push([game.title]);
			});

			table.push([`Total: ${currentValue.games.length} games`]);
			console.log(table.toString());
		});
	},
	addGame: async (game) => {
		if (game !== undefined) {
			const thegamesdbResult = await thegamesdb.getGamesList({
				name: utils.multipleWordsInput(process.argv)
			});

			if (thegamesdbResult.length > 0) {
				const choices = thegamesdbResult.map(item => {
					return {
						name: `${item.title} | ${item.platform}`,
						value: item.id
					};
				});

				const addGamesDialog = await utils.dialog('checkbox', 'Select games to add:', 'gameIDs', choices, 10, 'You must choose at least one game');
				const addGamesConfirmDialog = await utils.dialog('confirm', 'Add selected game(s)?:', 'isAdding');

				if (addGamesConfirmDialog.isAdding) {
					for (const gameID of addGamesDialog.gameIDs) {
						let gameInformation = await thegamesdb.getGame({ id: gameID });
						await gcdb.addGame(gameInformation);
						utils.gameAdded(gameInformation.title);
					}
				}
			}
			else {
				utils.noGamesFound();
			}
		}
		else {
			utils.pleaseEnterName();
		}
	},
	removeGame: async (game) => {
		if (game !== undefined) {
			const query = {
				title: utils.multipleWordsInput(process.argv)
			};

			const filteredGames = await gcdb.getGames(query);

			if (filteredGames.length > 0) {
				const choices = filteredGames.map(item => {
					return {
						name: `${item.title} | ${item.platform}`,
						value: item._id
					};
				});

				const removeGamesDialog = await utils.dialog('checkbox', 'Remove a game:', 'removeGame', choices, 10, 'You must choose at least one game');
				const removeGamesConfirmDialog = await utils.dialog('confirm', 'Remove selected game(s)?:', 'isRemoving');

				if (removeGamesConfirmDialog.isRemoving) {
					for (const gameID of removeGamesDialog.removeGame) {
						let gameToBeRemoved = await gcdb.getGame(gameID);
						await gcdb.deleteGame(gameID);
						utils.gameRemoved(gameToBeRemoved.title);
					}
				}
			}
			else {
				utils.noGamesFound();
			}
		}
		else {
			utils.pleaseEnterName();
		}
	}
};
