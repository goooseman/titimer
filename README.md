# TiTimer

> `tiː ˈtaɪ.mər` short of TinyTimer and also refers to TeaTimer

A very simple CLI utility to run a timer for a specific period of time.

Written with 0 code dependencies (but uses [module-alias](https://www.npmjs.com/package/module-alias) just for import aliases)

Can parse a string in a format `1h20m30s`. Extra blocks (hours and minutes) can be skipped, e.g. `30s`.

## Installation

`npm i -g titimer`

## Usage

`titimer 1h20m30s` - runs a timer for 1 hour, 20 minutes, 30 seconds
`titimer 20m30s` - runs a timer for 20 minutes, 30 seconds
`titimer 30s` - runs a timer for 30 seconds

## TODO

- [ ] Make a pluralization for seconds output (now the output is `1 seconds`)
- [ ] Make an output string to output timer in `n hours n minutes n seconds` format (now the ouptut is `3600 seconds`)
- [ ] Show a system notification when timer is finished, with an opt-out parameter
- [ ] Package to single executable and provide a cask for homebrew
