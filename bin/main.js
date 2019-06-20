#!/usr/bin/env node
const os = require("os")
const fs = require("fs")
const path = require("path")
const yargs = require("yargs")
const configure = require("./configure")
const Factory = require("./Factory")
const updateNotifier = require('update-notifier')

const pkg = require('../package.json')
updateNotifier({pkg, updateCheckInterval: 1000 * 1}).notify()

const house = path.resolve(os.homedir(), ".cari")


yargs.usage('usage: $0 <cmd>')
	.command(["config", "set"], 'to choose a dictionary', () => { }, () => {
		configure()
	})
	.command('*', 'to look up a word', () => { }, (argv) => {
		const word_s = argv._[0]
		if (!word_s) {
			return null
		}
		let key
		try {
			key = fs.readFileSync(path.resolve(house, "config"), {encoding: "utf8"})
		} catch (e) {
			return configure()
		}
		const dict = Factory.getDictionary(key)
		dict.lookup(word_s)
	})
	.demandCommand(1, 'You need at least one command before moving on')
	.scriptName("cari")
	.alias("help", "h")
	.alias("version", "v")
	.strict()
	.help()
	.argv
