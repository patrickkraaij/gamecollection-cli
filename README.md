gamecollection-cli
==================

![npm](https://img.shields.io/npm/v/gamecollection-cli.svg)
![node](https://img.shields.io/node/v/gamecollection-cli.svg)
![Codacy branch grade](https://img.shields.io/codacy/grade/962dc9309d404914af7d241c664208b8/master.svg)
![Codacy coverage](https://img.shields.io/codacy/coverage/962dc9309d404914af7d241c664208b8.svg)
![npm](https://img.shields.io/npm/dt/gamecollection-cli.svg)

Gamecollection-cli is a command line tool to store all your owned games into a MongoDB database. It retrieves data from thegamesdb.net.

## Table of Contents

1. [Configuration](#configuration)
2. [Installation](#installation)
3. [Commands](#commands)
4. [Examples](#examples)
5. [Contributing](#contributing)

## Configuration
<a name="configuration"></a>
Create a hidden file called `.gamecollection.config.js` in your home directory to make a connection to your MongoDB database.

``` shell
$ touch ~/.gamecollection.config.js
```

``` javascript
// .gamecollection.config.js
module.exports = {
  url: 'mongodb://[username:password@]host1[:port1][/[database][?options]]',
  db: 'nameOfYourDatabase',
  collection: 'games'
};
```

## Installation
<a name="installation"></a>
``` shell
$ yarn global add gamecollection-cli
```
or
``` shell
$ npm install -g gamecollection-cli
```

## Commands
<a name="commands"></a>
```
list [options]    Retrieve all the games from the database
add <game>        Search for a game and add it to the database
remove|rm <game>  Remove a game from the database
repair|rp         Repair your game collection
export|ex         Export your game collection to a JSON file and save it on disk
import|im         Import your game collection from a JSON file located on disk
```

## Examples
<a name="examples"></a>
``` shell
$ gamecollection list
$ gamecollection list -p
$ gamecollection list | grep Mario
$ gamecollection add Super Mario World
$ gamecollection remove Super Mario World
$ gamecollection repair
$ gamecollection export
$ gamecollection import
```
## Contributing
<a name="contributing"></a>
When contributing, please respect the ESLint rules. Check if you got any errors by running `npm run lint`.
