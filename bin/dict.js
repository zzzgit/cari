const cheerio = require('cheerio')
const chalk = require('chalk')
// const argv = process.argv.slice(2)
// const source = argv[0]
// process.exit(0)


process.stdin.on('data', processLine)

function processLine(source) {
	const $ = cheerio.load(source)
	const container = $("#content > div.main > div.word > div.basic.clearfix > ul")
	if (!container.length) {
		return null // no data
	}
	container.children().each((index, li) => {
		const item = $(li)
		const kelas = item.children("span").text()
		const description = item.children("strong").text()
		console.log(chalk.gray(kelas) + "\t" + description)
	})
}
