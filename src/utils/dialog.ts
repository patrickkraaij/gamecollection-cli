import * as inquirer from 'inquirer';

/**
 * Returns a dialog
 *
 * @export
 * @param {string} dialogType
 * @param {string} dialogMessage
 * @param {string} dialogName
 * @param {object[]} [dialogChoices]
 * @param {number} [dialogPageSize]
 * @param {*} [dialogNoSelectionMessage]
 * @returns {Promise<object>}
 */
export async function dialog(dialogType: string,
	dialogMessage: string,
	dialogName: string,
	dialogChoices?: object[],
	dialogPageSize?: number,
	dialogNoSelectionMessage?): Promise<object> {
	return await inquirer.prompt([{
		type: dialogType,
		message: dialogMessage,
		name: dialogName,
		choices: dialogChoices,
		pageSize: dialogPageSize,
		validate: (answer) => {
			if (answer.length < 1) {
				return dialogNoSelectionMessage;
			}
			return true;
		}
	}]);
}
