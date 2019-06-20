const cheerio = require('cheerio')
const samael = require("samael")
import Dictionary from "../Dictionary"

class YoudaoDictionary implements Dictionary {
	url_tmpl: string = "http://www.youdao.com/w/eng/{key_s}/"

	lookup(word_s: string): string {
		const url_s = this.url_tmpl.replace("{key_s}", word_s)
		return samael.fetch(url_s).then((text) => {
			const $ = cheerio.load(text)
			const container = $("#phrsListTab > div > ul")
			if (!container.length) {
				return null // no data
			}
			return container.children().each((index, li) => {
				console.log($(li).text())
			})
		})
	}
}


export default YoudaoDictionary
