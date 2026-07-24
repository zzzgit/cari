import { load } from 'cheerio'
import chalk from 'chalk'

class DictDictionary {
	url_tmpl = "http://dict.cn/{key_s}"

	lookup(word_s) {
		const url_s = this.url_tmpl.replace("{key_s}", word_s)
		return fetch(url_s).then((res) => res.text()).then((text) => {
			const $ = load(text)
			const container = $("#content > div.main > div.word > div.basic.clearfix > ul")
			if (!container.length) {
				return null // no data
			}
			return container.children().each((index, li) => {
				const item = $(li)
				const kelas = item.children("span").text()
				const description = item.children("strong").text()
				console.log(chalk.gray(kelas) + "\t" + description)
			})
		})
	}
}

export default DictDictionary
