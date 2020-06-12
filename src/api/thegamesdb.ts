import { inquirerGameList, gcGame, tgdbGame, tgdbGetGameById, tgdbPlatforms, tgdbPages } from '../interfaces';
import { configFile } from '../constants';
import { fetchJSON } from '../utils';

const { key, url } = configFile.api.thegamesdb;
const endpoints = {
  getGameByID: `${url}/Games/ByGameID?apikey=${key}`,
  getGameName: `${url}/Games/ByGameName?apikey=${key}`,
  getPlatforms: `${url}/Platforms?apikey=${key}`,
  getPlatformByID: `${url}/Platforms/ByPlatformID?apikey=${key}`,
  getGenres: `${url}/Genres/?apikey=${key}`,
  getDevelopers: `${url}/Developers/?apikey=${key}`,
  getPublishers: `${url}/Publishers/?apikey=${key}`
};
const fields = 'players,publishers,genres,overview,last_updated,rating,platform,coop,youtube,alternates';
const include = 'boxart,platform';

/**
 * Get a list of games which are matching the given user input
 *
 * @export
 * @param {string} searchInput
 * @param {number} [page=1]
 * @returns {Promise<inquirerGameList[]>}
 */
export async function searchGame(searchInput: string, page: number = 1): Promise<inquirerGameList[]> {
  try {
    const { getGameName, getPlatforms } = endpoints;
    const apiGetGameNameResponse = await fetchJSON(`${getGameName}&name=${searchInput}&page=${page}`);
    const { pages } = apiGetGameNameResponse;
    const { games } = apiGetGameNameResponse.data;

    const apiGetPlatformResponse = await fetchJSON(getPlatforms);
    const { platforms } = apiGetPlatformResponse.data;

    const list = gameList(games, platforms);
    pagination(pages, list);

    return list;
  }
  catch (err) {
    return Promise.reject(err);
  }
}

/**
 * Game information derived form the ID
 *
 * @export
 * @param {number} id
 * @returns {Promise<gcGame[]>}
 */
export async function getGameInformation(id: number): Promise<gcGame[]> {
  try {
    const { getGameByID } = endpoints;
    const apiGetGameGameByIDResponse = await fetchJSON(`${getGameByID}&id=${id}&fields=${fields}&include=${include}`);
    return mapApiResponse(apiGetGameGameByIDResponse);
  }
  catch (err) {
    return Promise.reject(err);
  }
}

/**
 * Map api response to the db schema
 *
 * @param {tgdbGetGameById} apiResult
 * @returns {gcGame[]}
 */
function mapApiResponse(apiResult: tgdbGetGameById): gcGame[] {
  const { games } = apiResult.data;
  return games.map((game: tgdbGame) => {
    const {
      id,
      game_title,
      platform,
      release_date,
      overview,
      last_updated,
      rating,
      developers,
      publishers,
      players,
      coop,
      alternates,
      genres,
      youtube
    } = game;
    const { base_url, data } = apiResult.include.boxart;

    return {
      id,
      title: game_title,
      platform,
      releaseDate: release_date,
      overview,
      last_updated,
      rating,
      developer: developers,
      publisher: publishers,
      players,
      coop,
      similar: alternates,
      genres,
      youtube,
      images: {
        boxart: {
          size: base_url,
          data
        }
      }
    };
  });
}

/**
 * Add an extra option in the list to enable paging
 *
 * @param {tgdbPages} pages
 * @param {inquirerGameList[]} games
 */
function pagination(pages: tgdbPages, games: inquirerGameList[]): void {
  if (pages.previous !== null) {
    games.push({
      name: '<<< PREVIOUS GAMES',
      value: pages.previous
    });
  }

  if (pages.next !== null) {
    games.push({
      name: 'MORE GAMES >>>',
      value: pages.next
    });
  }
}

/**
 * List of games for the TUI
 *
 * @param {tgdbGame[]} games
 * @param {tgdbPlatforms} platforms
 * @returns {inquirerGameList[]}
 */
function gameList(games: tgdbGame[], platforms: tgdbPlatforms): inquirerGameList[] {
  return games.map((game: tgdbGame) => {
    return {
      name: `${game.game_title} | ${platforms[game.platform].name}`,
      value: game.id
    };
  });
}
