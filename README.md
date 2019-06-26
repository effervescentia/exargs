# exargs

> Expand your arguments, expand your mind.

Basically a cli wrapper for [`dargs`](npm.im/dargs) that allows you to easily externalize arguments and flags
for passing to cli's that don't support `.*rc` or other configuration files.

## Installation

```sh
npm install --save-dev exargs
# or
yarn add exargs
```

## Usage

This utility depends on argument expansion in order to work properly.

```json
// package.json

{
  "scripts": {
    "start:long": "mycmd --with=alot,of,arguments,oh,so,long --why=do,i,have,all,of,this,in,here --what=have,i,done,to,deserve,this",
    "start:short": "mycmd $(exargs .mycmdrc)"
  }
}
```

```json
// .mycmdrc

{
  "with": "alot,of,arguments,oh,so,long",
  "why": "do,i,have,all,of,this,in,here",
  "what": "have,i,done,to,deserve,this"
}
```

### Options

All of the options accepted by [`dargs`](npm.im/dargs) can be passed to `exargs`. The only way to pass these options currently is to add a `$` property to the configuration file you have specified.

```json
// .mycmdrc

{
  "$": {
    "combine": ["property"]
  },

  "property": ["one", "two"]
}
```

There are also some options added to make `exargs` more configurable:

- `combine` _Array_ - specify fields which should be rolled up into a single string to avoid `dargs` generating multiple arguments.

#### `combine`

Without `combine`:

```json
{
  "with": ["alot", "of", "arguments", "oh", "so", "long"]
}

// yields: --with=alot --with=of --with=arguments --with=oh --with=so --with=long
```

With `combine`:

```json
{
  "$": {
    "combine": ["with"]
  },
  "with": ["alot", "of", "arguments", "oh", "so", "long"]
}

// yields: --with=alot --with=of --with=arguments --with=oh --with=so --with=long
```
