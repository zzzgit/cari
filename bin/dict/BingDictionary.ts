const samael = require("samael")
const cheerio = require('cheerio')
import Dictionary from "../Dictionary";

class BingDictionary implements Dictionary {
    url_tmpl: string = "https://cn.bing.com/dict/search?q={key_s}"

    lookup(word_s: string): string {
        const url_s = this.url_tmpl.replace("{key_s}", word_s)
        return samael.fetch(url_s).then(text => {
            const $ = cheerio.load(text)
            const container = $("div.contentPadding div.qdef > ul")
            if (!container.length) {
                return null // no data
            }
            container.children().each((index, li) => {
                console.log($(li).text())
            })
        })
    }


}

export default BingDictionary
