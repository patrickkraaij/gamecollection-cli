gamecollection-cli
==================

Gamecollection-cli is a command line tool to store all your owned games into a MongoDB database. It retrieves data from thegamesdb.net.

## Table of Contents

1. [Configuration](#configuration)
2. [Commands](#commands)
3. [Examples](#examples)
4. [Contributing](#contributing)

## Configuration
<a name="configuration"></a>
Create a hidden file called `.gamecollection.config.js` in your home directory to make a connection to your mongodb database.

``` javascript
// gamecollection.config.js
module.exports = {
	url: 'mongodb://[username:password@]host1[:port1][/[database][?options]]'
};
```
## Commands
    list|l             Retrieve all the games from the database
    add|a [game]       Search for a game and add it to the database
    remove|rm [game]   Remove a game from the database

## Examples
``` shell
gamecli list
```

``` shell
gamecli add Super Mario World
```

``` shell
gamecli remove Super Mario World
```
## Contributing
<a name="contributing"></a>
When contributing, please respect the ESLint rules. Check if you got any errors by running `npm run lint`.
