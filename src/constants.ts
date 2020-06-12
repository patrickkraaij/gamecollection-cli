import * as os from 'os';

export const labels = {
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
    addedToCollection: 'added to your game collection',
    removedFromCollection: 'removed from your game collection',
    noGamesFound: 'No games found',
    exportFailed: 'Could not export your gamecollection',
    couldNotCompleteRequest: 'Could not complete your request, please enter a name for a game',
    repair: {
      progress: 'Repairing games, please wait...',
      complete: 'Repairing complete',
      noGamesToRepair: 'No need to repair games'
    },
  },
  dialog: {
    add: {
      title: 'Select games to add:',
      validationMessage: 'You must choose at least one game',
      comfirmTitle: 'Add selected game(s)?:'
    },
    remove: {
      title: 'Remove game:',
      validationMessage: 'You must choose at least one game',
      comfirmTitle: 'Remove selected game(s)?:'
    },
    import: {
      confirmTitle: 'This will remove your current game collection and will import a new collection from a JSON file on disk. Are you sure?'
    }
  },
  successfullyExported: (path: string) => `Exported your gamecollection to ${path}`,
  calculateGames: (amountOfGames: number) => `${amountOfGames} games`
};

export const columnWidth = {
  title: 60,
  platform: 40,
  fullWidth: 100
}
export const configFile = require(`${os.homedir()}/.gamecollection.config.js`);
export const collectionFile = `${os.homedir()}/gamecollection.json`;
