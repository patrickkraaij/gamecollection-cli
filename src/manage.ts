import * as fs from 'fs';
import * as gcdb from 'gamecollection-mongodb';
import { gcGame, inquirerGameList } from './interfaces';
import { collectionFile, labels } from './constants';
import { api, dialog, log } from './utils';

export async function importCollection(): Promise<void> {
  try {
    const gamecollectionFromFile = fs.readFileSync(collectionFile, 'utf-8');
    const importConfirmDialog = await dialog('confirm', labels.dialog.import.confirmTitle, 'isImporting');

    if (importConfirmDialog['isImporting']) {
      // await gcdb.dropGamecollection();
      for (const game of JSON.parse(gamecollectionFromFile)) {
        await gcdb.addGame(game);
        log('info', `${game.title} | ${game.platform}`);
      }
    }
  }
  catch (err) {
    throw err;
  }
}

export async function exportCollection(): Promise<void> {
  try {
    const gamecollection = await gcdb.getGames();
    fs.writeFileSync(collectionFile, JSON.stringify(gamecollection));
    log('success', labels.successfullyExported(collectionFile));
  }
  catch (err) {
    log('error', labels.log.exportFailed);
    throw err;
  }
}

export async function refreshGamesFromExport(): Promise<void> {
  try {
    const gamecollectionFromFile = fs.readFileSync(collectionFile, 'utf-8');
    const importConfirmDialog = await dialog('confirm', labels.dialog.import.confirmTitle, 'isImporting');

    if (importConfirmDialog['isImporting']) {
      const failedToImport: any = [];
      // await gcdb.dropGamecollection();
      for (const game of JSON.parse(gamecollectionFromFile) as gcGame[]) {
        const matchedGame = await matchedGameList(game);

        if (matchedGame[0]) {
          await addMatchedGame(matchedGame);
        }
        else {
          const { title, platform } = game;
          const gameAndPlatform = `${title} | ${platform}`;
          failedToImport.push(gameAndPlatform);
          log('error', gameAndPlatform);
        }
      }
      log('error', 'These games could not been added, please add them manually');
      console.log(failedToImport);
    }
  }
  catch (err) {
    throw err;
  }
}

async function matchedGameList(game: gcGame): Promise<inquirerGameList[]> {
  const myApi = await api();
  const { title, platform } = game;
  const gameslistFromAPI = await myApi.searchGame(title);

  return gameslistFromAPI.filter((apigame: inquirerGameList) => {
    return apigame.name === `${title} | ${platform}`;
  });
}

/**
 * Retrieve information from the matched game and adds it to the database
 *
 * @param {inquirerGameList[]} matchedGame
 * @returns {Promise<void>}
 */
async function addMatchedGame(matchedGame: inquirerGameList[]): Promise<void> {
  const myApi = await api();
  const gameinformation = await myApi.getGameInformation(matchedGame[0].value);
  await gcdb.addGame(gameinformation[0]);
  log('success', matchedGame[0].name);
}
