const os = require("os")
const path = require("path")
const inquirer = require('inquirer')
const samael = require("samael")
const dictionaryList = require("./list.json")
const languages_a = [{name: "han", value: "han"}, {name: "en", value: "en"}, {name: "jan", value: "jan"}, {name: "fra", value: "fra"}, {name: "may", value: "may"}, {name: "tgl", value: "tgl"}]

const house = path.resolve(os.homedir(), ".cari")
dictionaryList.forEach((item) => {
	const segments = item.value.split(".")
	item.from = segments[1]
	item.to = segments[2]
})

const inquire = () => {
	inquirer.prompt([
		{
			name: 'way',
			type: 'list',
			message: 'choose by:',
			choices: [{value: "name", name: "name of dictionary"}, {value: "category", name: "category of language"}],
			default: "name",
		},
		{
			name: 'from',
			type: 'list',
			message: 'from which language:',
			when: (answers) => {
				return answers.way === "category"
			},
			choices: languages_a,
			default: "en",
		},
		{
			name: 'to',
			type: 'list',
			message: 'to which language:',
			when: (answers) => {
				return answers.way === "category"
			},
			choices: languages_a,
			default: "en",
		},
		{
			name: 'dictionary',
			type: 'list',
			message: 'select dictionary:',
			when: (answers) => {
				if (answers.way === "name") {
					return true
				}
				return dictionaryList.filter((item) => {
					return item.from === answers.from && item.to === answers.to
				}).length
			},
			choices: (answers) => {
				if (answers.way === "name") {
					return dictionaryList
				}
				return dictionaryList.filter((item) => {
					return item.from === answers.from && item.to === answers.to
				})
			},
		},
	]).catch((e) => {
		console.error(`[cari][inquirer]: error occurred when selecting menu:`, e)
		// eslint-disable-next-line unicorn/no-process-exit
		process.exit()
	})
		.then((answers) => {
			const dict = answers.dictionary
			if (!dict) {
				return console.log(`[cari][inquirer]: no appropriate dictionary!`)
			}
			return samael.writeToFile(path.resolve(house, "config"), dict)
		})
		.catch((e) => {
			console.error(`[cari]: error occurred when configuring:`, e)
			// eslint-disable-next-line unicorn/no-process-exit
			process.exit()
		})
}

module.exports = inquire
