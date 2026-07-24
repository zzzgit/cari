#!/usr/bin/env node
import os from 'os'
import fs from 'fs'
import path from 'path'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import configure from './configure.js'
import { getDictionary } from './Factory.js'
import updateNotifier from 'update-notifier'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const pkg = require('../package.json')

updateNotifier({ pkg, updateCheckInterval: 1000 * 1 }).notify()

const house = path.resolve(os.homedir(), '.cari')

yargs(hideBin(process.argv))
	.usage('usage: $0 <cmd>')
	.command(['config', 'set'], 'to choose a dictionary', () => { }, () => {
		configure()
	})
	.command('*', 'to look up a word', () => { }, (argv) => {
		const word_s = argv._[0]
		if (!word_s) {
			return null
		}
		let key
		try {
			// eslint-disable-next-line security/detect-non-literal-fs-filename
			key = fs.readFileSync(path.resolve(house, 'config'), { encoding: 'utf8' })
		} catch (e) {
			return configure()
		}
		const dict = getDictionary(key)
		dict.lookup(word_s)
	})
	.demandCommand(1, 'You need at least one command before moving on')
	.scriptName('cari')
	.alias('help', 'h')
	.alias('version', 'v')
	.help()
	.parse()
