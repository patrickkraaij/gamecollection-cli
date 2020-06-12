// import Table from 'cli-table';
const Table = require('cli-table');
import * as gcdb from 'gamecollection-mongodb';
import { apiInterface, gcGame, inquirerGameList } from './interfaces';
import { configFile, labels, columnWidth } from './constants';
import { api, dialog, log } from './utils';

export async function getCollection(): Promise<void> {
  try {
    const { collectionTableHeader } = labels;
    const { gamesInCollection } = labels.log;
    const tableHeader = {
      head: collectionTableHeader,
      colWidths: [columnWidth.title, columnWidth.platform]
    };

    const table = new Table(tableHeader);
    const gamecollection: gcGame[] = await gcdb.getGames();

    if (gamecollection.length) {
      for (const game of gamecollection) {
        const { title, platform } = game;
        table.push([title, platform]);
      }
      console.log(table.toString());
      log('success', `${gamecollection.length} ${gamesInCollection}`);
    }
  }
  catch (err) {
    log('error', err);
    throw Error(err);
  }
}

export async function addGame(game: string, page?: number): Promise<void> {
  const myApi = await api();
  const result: inquirerGameList[] = await myApi.searchGame(game, page);

  const { title, validationMessage, comfirmTitle } = labels.dialog.add;
  const { noGamesFound } = labels.log;

  if (result.length) {
    const addGamesDialog = await dialog('checkbox', title, 'gameIDs', result, 100, validationMessage);
    nextOrPreviousGames(addGamesDialog);
    const addGamesConfirmDialog = await dialog('confirm', comfirmTitle, 'isAdding');
    await addGamesToDB(myApi, addGamesConfirmDialog, addGamesDialog);
  }
  else {
    log('info', noGamesFound);
  }
}

export async function removeGame(userInput: string): Promise<void> {
  const regexp = RegExp(userInput);
  const { noGamesFound } = labels.log;

  const gamecollection = await gcdb.getGames();
  const gamesToRemove = filterCollection(regexp, gamecollection);

  if (gamesToRemove.length) {
    return await removeGamesDialog(gamesToRemove);
  }

  log('info', noGamesFound);
}

function filterCollection(regexp, gamecollection: gcGame[]): inquirerGameList[] {
  return gamecollection
    .filter(currentValue => regexp.test(currentValue.title))
    .map(filteredGame => {
      return {
        name: `${filteredGame.title} | ${filteredGame.platform}`,
        value: filteredGame._id
      };
    });
}

async function removeGamesDialog(gamesToRemove: inquirerGameList[]): Promise<void> {
  const { removedFromCollection } = labels.log;
  const { title, validationMessage, comfirmTitle } = labels.dialog.remove;

  const removeGamesDialog = await dialog('checkbox', title, 'removeGame', gamesToRemove, 10, validationMessage);
  const removeGamesConfirmDialog = await dialog('confirm', comfirmTitle, 'isRemoving');

  if (removeGamesConfirmDialog['isRemoving']) {
    for (const gameID of removeGamesDialog['removeGame']) {
      const gameToBeRemoved = await gcdb.getGame(gameID);
      await gcdb.deleteGame(gameID);
      log('success', `${gameToBeRemoved.title} ${removedFromCollection}`);
    }
  }
}

function nextOrPreviousGames(addGamesDialog): Promise<void> | undefined {
  if (configFile.defaultApi === 'thegamesdb' && typeof addGamesDialog['gameIDs'][0] !== 'number') {
    const name = addGamesDialog['gameIDs'][0].split('&')[1].split('=')[1]; // &name=Mario becomes Mario
    const page = addGamesDialog['gameIDs'][0].split('&')[2].split('=')[1]; // &page=1 becomes 1
    return addGame(name, page);
  }
}

async function addGamesToDB(myApi: apiInterface, addGamesConfirmDialog, addGamesDialog): Promise<void> {
  if (addGamesConfirmDialog['isAdding']) {
    const { addedToCollection } = labels.log;
    for (const gameID of addGamesDialog['gameIDs']) {
      const gameInformation = await myApi.getGameInformation(gameID);
      await gcdb.addGame(gameInformation[0]);
      log('success', `${gameInformation[0].title} ${addedToCollection}`);
    }
  }
}
