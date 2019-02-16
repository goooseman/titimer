# TiTimer

[![Build Status](https://travis-ci.org/goooseman/titimer.svg?branch=master)](https://travis-ci.org/goooseman/titimer)
[![Coverage Status](https://coveralls.io/repos/github/goooseman/titimer/badge.svg?branch=master)](https://coveralls.io/github/goooseman/titimer?branch=master)

> `tiː ˈtaɪ.mər` short of TinyTimer and also refers to TeaTimer

![asciicast](./extra/preview.gif)

A very simple CLI utility to run a timer for a specific period of time.

Written with 0 code dependencies (but uses [module-alias](https://www.npmjs.com/package/module-alias) just for import aliases)

Can parse a string in a format `1h20m30s`. Extra blocks (hours and minutes) can be skipped, e.g. `30s`.

## Installation

`npm i -g titimer`

## Usage

- `titimer 1h20m30s` - runs a timer for 1 hour, 20 minutes, 30 seconds
- `titimer 20m30s` - runs a timer for 20 minutes, 30 seconds
- `titimer 30s` - runs a timer for 30 seconds

- `titimer -v` - prints version
- `titimer -h` - prints help

## TODO

- [ ] Make a pluralization for seconds output (now the output is `1 seconds`)
- [ ] Make an output string to output timer in `n hours n minutes n seconds` format (now the ouptut is `3600 seconds`)
- [ ] Show a system notification when timer is finished, with an opt-out parameter
- [ ] Package to single executable and provide a cask for homebrew

## Preview generation

- `cd ..`
- `asciinema rec titimer/extra/preview.cast`
- `titimer 3s`
- `CTRL+d`
- `cd -`
- `npx asciicast2gif -s 2 extra/preview.cast extra/preview.svg`
