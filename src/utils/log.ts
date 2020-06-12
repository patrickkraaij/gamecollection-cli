import * as chalk from 'chalk';

/**
 * Display logs in the terminal
 *
 * @export
 * @param {string} type
 * @param {string} message
 */
export function log(type: string, message: string): void {
	const types = {
		warning: chalk.default.yellow(message),
		success: chalk.default.green(message),
		error: chalk.default.red(message),
		info: chalk.default.blueBright(message)
	}
	const logType = types[type] || chalk.default.blueBright(message);
	console.log(logType);
}
