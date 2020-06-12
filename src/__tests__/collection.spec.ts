jest.mock('cli-table');
const gcdb = require('gamecollection-mongodb');
import * as collection from '../collection';
import * as utils from '../utils';

describe('Collection', () => {
  let games;
  let gamesPerPlatform;
  let getGamesSpy;
  let logSpy;
  let consoleSpy;

  beforeEach(() => {
    games = [{ title: 'Super Mario' }];
    gamesPerPlatform = [{ platform: 'Super Nintendo', games }];
    logSpy = jest.spyOn(utils, 'log');
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    getGamesSpy = jest.spyOn(gcdb, 'getGames');
  });

  test('returns an array of games', async () => {
    getGamesSpy.mockImplementation(() => games);
    await collection.getCollection();
    expect(getGamesSpy).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalled();
  });

  test('returns an empty array when there are no games', async () => {
    getGamesSpy.mockImplementation(() => []);
    await collection.getCollection();
    expect(getGamesSpy).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalled();
  });

  // test('throws an error when there is no connection to the database possible', async () => {
  // 	const collectionSpy = jest.spyOn(collection, 'getCollection');
  // 	gcdb.getGames = jest.fn(() => {
  // 		throw Error();
  // 	});
  // 	await collection.getCollection();
  // 	expect(collectionSpy).toThrow();
  // });
});

describe('Add a game', () => {
  test('returns a list of games when there is a match', async () => {
    const searchGame = jest.fn().mockReturnValue([{
      name: 'Super Mario World | Super Nintendo',
      value: 1
    }]);
    const getGameInformation = jest.fn().mockImplementation(() => Promise.resolve([{ title: 'Super Mario World' }]));
    const defaultApi = 'thegamesdb';
    jest.spyOn(utils, 'api').mockImplementation(() => Promise.resolve({ searchGame, getGameInformation, defaultApi }));
    jest.spyOn(utils, 'dialog').mockImplementation(() => Promise.resolve({ gameIDs: [1] }));
    await collection.addGame('Super Mario World');

  });

  test('returns \'no games\' found when there are no games returned from the api', async () => {
    const searchGame = jest.fn().mockReturnValue([]);
    const getGameInformation = jest.fn();
    const defaultApi = 'thegamesdb';
    const logSpy = jest.spyOn(utils, 'log');
    jest.spyOn(utils, 'api').mockImplementation(() => Promise.resolve({ searchGame, getGameInformation, defaultApi }));
    await collection.addGame('No');

    expect(logSpy).toHaveBeenCalled();
  });

});

describe('Remove a game', () => {

});

