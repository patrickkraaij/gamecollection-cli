const gcdb = require('gamecollection-mongodb');
import * as fs from 'fs';
import * as manage from '../manage';
import * as utils from '../utils';

describe('Import collection', () => {
  let logSpy;
  let addGameSpy;

  beforeEach(() => {
    logSpy = jest.spyOn(utils, 'log').mockImplementation();
    addGameSpy = jest.spyOn(gcdb, 'addGame').mockImplementation();
  });

  test('it should import a game collection when the import file is present', async () => {
    // fake filepath
    // jest.spyOn(utils, 'dialog').mockImplementation(() => Promise.resolve({ isImporting: true }));
    // jest.spyOn(gcdb, 'dropGamecollection').mockImplementation();
    // await manage.importCollection();

    // expect(logSpy).toHaveBeenCalled();
    // expect(addGameSpy).toHaveBeenCalled();
  });

  test('it should not import a game collection when the user declines the confirmation', async () => {
    // fake filepath
    jest.spyOn(utils, 'dialog').mockImplementation(() => Promise.resolve({ isImporting: false }));
    await manage.importCollection();

    expect(logSpy).not.toHaveBeenCalled();
    expect(addGameSpy).not.toHaveBeenCalled();
  });



  test('it should raise an error when the import file is not present', async () => {

  })
});

describe('Export collection', async () => {
  test('it should export the gamecollection', async () => {
    jest.spyOn(gcdb, 'getGames').mockImplementation(() => []);
    const logSpy = jest.spyOn(utils, 'log').mockImplementation();
    await manage.exportCollection();
    expect(logSpy).toHaveBeenCalled();
  });

  test('it raise an error when you cannot connect to the db or write a file to the filesystem', async () => {

  });
});

describe('Repairing collection', async () => {

});
