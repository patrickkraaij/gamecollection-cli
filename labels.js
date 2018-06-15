'use strict';

module.exports = {
	collectionTableHeader: [
		'Title',
		'Platform'
	],
	program: {
		list: 'Retrieve all the games from the database',
		add: 'Search for a game and add it to the database',
		remove: 'Remove a game from the database',
		repair: 'Repair your game collection',
		export: 'Export your game collection to a JSON file and save it on disk',
		import: 'Import your game collection from a JSON file located on disk'
	},
	log: {
		gamesInCollection: 'games in your collection',
		insertedIntoCollection: 'inserted into your game collection',
		removedFromCollection: 'removed from your game collection'
	},
	dialog: {
		add: {
			title: 'Select games to add:',
			validationMessage: 'You must choose at least one game',
			comfirmTitle: 'Add selected game(s)?:'
		},
		remove: {
			title: 'Remove a game:',
			validationMessage: 'You must choose at least one game',
			comfirmTitle: 'Remove selected game(s)?:'
		},
		import: {
			confirmTitle: 'This will remove your current game collection and will import a new collection from a JSON file on disk. Are you sure?'
		}
	},
	repair: {
		progress: 'Repairing games, please wait...',
		complete: 'Repairing complete',
		noGamesToRepair: 'No need to repair games',
		addFailedGame: (failedGame) => {
			return `Please select a similair title as ${failedGame.title} | ${failedGame.platform} to complete your collection again`;
		}
	},
	export: {
		successfullyExported: (path) => {
			return `Exported your gamecollection to ${path}`;
		},
		failed: 'Could not export your gamecollection'
	},
	warning: {
		noGamesFound: 'No games found'
	},
	error: {
		couldNotCompleteRequest: 'Could not complete your request, please enter a name for a game'
	},
	calculateGames: (amountOfGames) => {
		return `${amountOfGames} games`;
	}
};
