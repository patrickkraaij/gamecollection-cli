# Change Log

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
