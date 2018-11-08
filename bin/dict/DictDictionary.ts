const cheerio = require('cheerio')
const samael = require("samael")
const chalk = require('chalk')
import Dictionary from "../Dictionary"

class DictDictionary implements Dictionary {
    url_tmpl: string = "http://dict.cn/{key_s}"

    lookup(word_s: string): string {
        const url_s = this.url_tmpl.replace("{key_s}", word_s)
        return samael.fetch(url_s).then(text => {
            const $ = cheerio.load(text)
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
        })
    }
}

export default DictDictionary
