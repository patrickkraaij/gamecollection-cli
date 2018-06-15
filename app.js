'use strict';

const fs = require('fs');
const os = require('os');
const Table = require('cli-table');
const thegamesdb = require('thegamesdb');
const gcdb = require('gamecollection-mongodb');
const labels = require('./labels');
const utils = require('./utils');

module.exports = {
	getCollection: async () => {
		const gamecollection = await gcdb.getGames();

		let table = new Table({
			head: labels.collectionTableHeader,
			colWidths: [60, 40]
		});

		for (const game of gamecollection) {
			table.push([game.title, game.platform]);
		}

		console.log(table.toString());
		utils.calculateGames(gamecollection);
	},
	getCollectionPerPlatform: async () => {
		const gamecollectionPerPlatform = await gcdb.getGamesPerPlatform();
		let table;

		for (const gamesPerPlatform of gamecollectionPerPlatform) {
			table = new Table({
				head: [gamesPerPlatform.platform],
				colWidths: [100]
			});

			for (const game of gamesPerPlatform.games) {
				table.push([game.title]);
			}
			table.push([labels.calculateGames(gamesPerPlatform.games.length)]);
			console.log(table.toString());
		}
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
			utils.console('log', labels.warning.noGamesFound);
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
			utils.console('log', labels.warning.noGamesFound);
		}
	},
	repair: async () => {
		const failedGames = [];
		const apiField = 'apiId';
		const gamecollection = await gcdb.getGames();
		const gameCollectionWithoutID = gamecollection.filter(currentValue => {
			return !currentValue.hasOwnProperty(apiField);
		});

		if (gameCollectionWithoutID.length) {
			utils.console('log', labels.repair.progress);

			for (const game of gameCollectionWithoutID) {
				const gamelist = await thegamesdb.getGamesList({ name: game.title, platform: game.platform });
				const matchedGame = utils.getMatchedGame(game, gamelist);

				if (matchedGame !== null) {
					await gcdb.updateGame(game._id, apiField, { thegamesdb: matchedGame.id });
				}
				else {
					failedGames.push(game);
				}
			}

			if (failedGames.length) {
				for (const failedGame of failedGames) {
					await gcdb.deleteGame(failedGame._id);
					utils.gameRemoved(failedGame.title);
					utils.console('log', labels.repair.addFailedGame(failedGame));
					await module.exports.addGame(failedGame.title);
				}
			}

			utils.console('log', labels.repair.complete);
		}
		else {
			utils.console('log', labels.repair.noGamesToRepair);
		}
	},
	export: async () => {
		const path = os.homedir() + '/gamecollection.json';

		try {
			const gamecollection = await gcdb.getGames();
			fs.writeFileSync(path, JSON.stringify(gamecollection));
			utils.console('success', labels.export.successfullyExported());
		}
		catch (err) {
			utils.console('error', labels.export.failed);
			throw err;
		}
	},
	import: async () => {
		const path = os.homedir() + '/gamecollection.json';

		try {
			const gamecollectionFromFile = fs.readFileSync(path, 'utf-8');
			const importConfirmDialog = await utils.dialog('confirm', labels.dialog.import.confirmTitle, 'isImporting');

			if (importConfirmDialog.isImporting) {
				await gcdb.dropGamecollection();
				for (const game of JSON.parse(gamecollectionFromFile)) {
					await gcdb.addGame(game);
					utils.gameAdded(game.title);
				}
			}
		}
		catch (err) {
			throw err;
		}
	}
};
