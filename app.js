'use strict';

const Table = require('cli-table');
const thegamesdb = require('thegamesdb');
const gcdb = require('gamecollection-mongodb');
const labels = require('./labels');
const utils = require('./utils');

module.exports = {
	getCollection: async () => {
		const result = await gcdb.getGames();

		let table = new Table({
			head: labels.collectionTableHeader,
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

			table.push([labels.calculateGames(currentValue.games.length)]);
			console.log(table.toString());
		});
	},
	addGame: async (game) => {
		const thegamesdbResult = await thegamesdb.getGamesList({
			name: game
		});

		if (thegamesdbResult.length) {
			const choices = thegamesdbResult.map(item => {
				return {
					name: `${item.title} | ${item.platform}`,
					value: item.id
				};
			});

			const addGamesDialog = await utils.dialog('checkbox', labels.dialog.add.title, 'gameIDs', choices, 10, labels.dialog.add.validationMessage);
			const addGamesConfirmDialog = await utils.dialog('confirm', labels.dialog.add.comfirmTitle, 'isAdding');

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
	},
	removeGame: async (game) => {
		const query = {
			title: game
		};

		const filteredGames = await gcdb.getGames(query);

		if (filteredGames.length) {
			const choices = filteredGames.map(item => {
				return {
					name: `${item.title} | ${item.platform}`,
					value: item._id
				};
			});

			const removeGamesDialog = await utils.dialog('checkbox', labels.dialog.remove.title, 'removeGame', choices, 10, labels.dialog.remove.validationMessage);
			const removeGamesConfirmDialog = await utils.dialog('confirm', labels.dialog.remove.comfirmTitle, 'isRemoving');

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
};
