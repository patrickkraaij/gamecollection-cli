'use strict';

const chalk = require('chalk'),
	os = require('os'),
	configFile = os.homedir() + '/.gamecollection.config.js';

module.exports = {
	uri: function () {
		try {
			const config = require(configFile);
			return config.url;
		} catch (e) {
			console.log(chalk.red('You need to create the file ') + chalk.blue(configFile) + chalk.red(' to make a connection to the MongoDB database. See the README how to do this.'));
		}
	},
	schema: function (data) {
		return {
			title: data.title,
			platform: data.platform,
			releaseDate: data.releaseDate,
			overview: data.overview,
			ESRB: data.ESRB,
			players: data.players,
			youtube: data.youtube,
			rating: data.rating,
			similar: data.similar,
			publisher: data.publisher,
			developer: data.developer,
			genres: data.genres,
			images: data.images
		};
	}
};
