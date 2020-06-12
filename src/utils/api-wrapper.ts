import { apiInterface } from '../interfaces';
import { configFile } from '../constants';

/**
 * Returns the functions from the api interface
 *
 * @export
 * @returns {Promise<apiInterface>}
 */
export async function api(): Promise<apiInterface> {
	const defaultApi = configFile.defaultApi;
	const { searchGame, getGameInformation } = await import(`../api/${defaultApi}`);
	return { searchGame, getGameInformation, defaultApi };
}
