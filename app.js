'use strict';

const Table = require('cli-table'),
	inquirer = require('inquirer'),
	MongoClient = require('mongodb').MongoClient,
	thegamesdb = require('thegamesdb'),
	mongodb = require('./db'),
	utils = require('./utils');

module.exports = {
	getCollection: () => {
		MongoClient.connect(mongodb.uri(), (err, db) => {
			utils.connectedToDB(db);

			db.collection('games').find().toArray((err, result) => {
				if (result.length > 0) {
					let table = new Table({
						head: ['Title', 'Platform'],
						colWidths: [60, 40]
					});

					result.sort(utils.sortGameTitle).forEach((currentValue) => {
						table.push([currentValue.title, currentValue.platform]);
					});

					console.log(table.toString());

					db.close();
				}
				utils.calculateGames(result);
			});
		});
	},
	getCollectionPerPlatform: () => {
		MongoClient.connect(mongodb.uri(), (err, db) => {
			utils.connectedToDB(db);

			db.collection('games').distinct('platform', ((err, result) => {
				if (result.length > 0) {
					result.sort().forEach((platform) => {
						db.collection('games').find({
							platform: platform
						}).toArray((err, games) => {
							let gamesTable = new Table({
								head: ['Title', 'Platform'],
								colWidths: [60, 40]
							});

							games.sort(utils.sortGameTitle).forEach((item) => {
								gamesTable.push([item.title, platform]);
							});

							gamesTable.push(['Total ' + platform + ' games', games.length]);

							console.log(gamesTable.toString());
						});
					});
					db.close();
				}
			}));
		});
	},
	getGame: (game) => {
		if (game !== undefined) {
			thegamesdb.getGamesList({
				name: utils.multipleWordsInput(process.argv)
			}).then((data) => {
				if (data.length > 0) {
					let results = [];

					data.forEach((currentValue) => {
						results.push({
							name: currentValue.title + ' ' + currentValue.platform,
							value: currentValue.id
						});
					});

					inquirer.prompt([{
						type: 'checkbox',
						message: 'Select a game to add:',
						name: 'selectgame',
						choices: results,
						pageSize: 10,
						validate: (answer) => {
							if (answer.length < 1) {
								return 'You must choose at least one game';
							}
							return true;
						}
					}]).then((answers) => {
						answers.selectgame.some((currentValue) => {
							thegamesdb.getGame({
								id: currentValue
							}).then((data) => {
								inquirer.prompt([{
									type: 'confirm',
									message: 'Add selected game(s)?:',
									name: 'insert'
								}]).then((confirmAnswer) => {
									if (confirmAnswer.insert === true) {
										MongoClient.connect(mongodb.uri(), (err, db) => {
											utils.connectedToDB(db);

											db.collection('games').insertOne(mongodb.schema(data), (err) => {
												utils.gameAdded(mongodb.schema(data).title);

												db.close();
											});
										});
									}
								});
							});
						});
					});
				} else {
					utils.noGamesFound();
				}
			});
		} else {
			utils.pleaseEnterName();
		}
	},
	deleteGame: (game) => {
		if (game !== undefined) {
			MongoClient.connect(mongodb.uri(), (err, db) => {
				utils.connectedToDB(db);

				let query = {
					title: utils.multipleWordsInput(process.argv)
				};

				db.collection('games').find(query).toArray((err, results) => {
					let promptResults = [];

					results.forEach((currentValue) => {
						promptResults.push({
							name: currentValue.title + ' ' + currentValue.platform,
							value: currentValue._id
						});
					});

					if (results.length > 0) {
						inquirer.prompt([{
							type: 'checkbox',
							message: 'Remove a game:',
							name: 'removegame',
							choices: promptResults,
							pageSize: 10,
							validate: (answer) => {
								if (answer.length < 1) {
									return 'You must choose at least one game';
								}
								return true;
							}
						}]).then((answers) => {
							inquirer.prompt([{
								type: 'confirm',
								message: 'Delete selected game(s)?:',
								name: 'remove',
							}]).then((confirmAnswer) => {
								if (confirmAnswer.remove === true) {
									MongoClient.connect(mongodb.uri(), (err, db) => {
										utils.connectedToDB(db);

										db.collection('games').deleteOne({
											'_id': answers.removegame[0]
										}, (err) => {
											if (err) {
												throw err;
											}
											utils.gameRemoved(results[0].title);
											db.close();
										});
									});
								}
							});
						});
					} else {
						utils.noGamesFound();
					}

					db.close();
				});
			});
		} else {
			utils.pleaseEnterName();
		}
	}
};
