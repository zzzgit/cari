import { load } from 'cheerio'

class BingDictionary {
	url_tmpl = "https://cn.bing.com/dict/search?q={key_s}"

	lookup(word_s) {
		const url_s = this.url_tmpl.replace("{key_s}", word_s)
		return fetch(url_s).then((res) => res.text()).then((text) => {
			const $ = load(text)
			const container = $("div.contentPadding div.qdef > ul")
			if (!container.length) {
				return null // no data
			}
			return container.children().each((index, li) => {
				console.log($(li).text())
			})
		})
	}
}

export default BingDictionary
