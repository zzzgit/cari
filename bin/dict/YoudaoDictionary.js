import { load } from 'cheerio'

class YoudaoDictionary {
	url_tmpl = "http://www.youdao.com/w/eng/{key_s}/"

	lookup(word_s) {
		const url_s = this.url_tmpl.replace("{key_s}", word_s)
		return fetch(url_s).then((res) => res.text()).then((text) => {
			const $ = load(text)
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
