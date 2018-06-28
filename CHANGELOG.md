# Change Log

## v2.3.0 (2018-06-28)
**Implemented enhancements**
- To remove a game, the exact title isn\'t required anymore. When you do `gamecollection remove Mario` it will list all the games with the word Mario.

## v2.2.0 (2018-06-15)
**Implemented enhancements**
- Added import and export command. `gamecollection export` will export your game collection to a JSON file and saves it on disk in the home folder. `gamecollection import` will import games from the JSON file which is created by the export command. When importing, it will overwrite the current game collection.

**Technical enhancements**
- Changed `foreach` into `for of` because of performance benefits
- Updated dependencies to the latest stable version

**General**
- Updated README

## v2.1.0 (2018-06-07)
**Implemented enhancements**
- Added a repair command, `gamecollection repair` to add an apiId key to all games in your collection in order to retrieve updates for games. In the near future there will be the ability to update each game in your collection.

**Technical enhancements**
- Simplified log function
- Updated dependencies to the latest stable version

**General**
- Updated labels

## v2.0.0 (2018-05-22)
**Implemented enhancements**
- When no command is given i.e. `gamecollection`, the help is displayed
- Changed layout of game collection per platform

**Technical enhancements**
- Updated dependencies to the latest stable version
- Removed db.js and integrate `gamecollection-mongodb`
- Rewritten the application in favour of async/await
- Add a dialog wrapper function
- Changed concat strings into template literals
- Changed bin command to `gamecollection`

**General**
- Updated README

## v1.1.0 (2017-10-16)
**Implemented enhancements**
- Add option to retrieve your games per platform, `gamecli list -p`
- When retrieving the collection, it will sort at the title column

**Technical enhancements**
- Updated dependencies to the latest stable version
- In help, the input for _add game_ and _delete game_ are mandatory
- Changed `some` function into `forEach`
- Removed checking for error when retrieving a collection

**General**
- Updated README

## v1.0.0 (2017-07-13)
- First release
