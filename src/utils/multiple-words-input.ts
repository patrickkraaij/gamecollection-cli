/**
 * Returns each word after the command,
 * eg. '$ node index.js add Super Mario World' returns Super Mario World
 *
 * @export
 * @param {string[]} input
 * @returns {string}
 */
export function multipleWordsInput(input: string[]): string {
	return input.splice(3).join(' ');
}
