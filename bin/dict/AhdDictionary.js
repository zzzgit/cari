import { load } from 'cheerio'
import chalk from 'chalk'

class AhdDictionary {
	url_tmpl = 'https://www.ahdictionary.com/word/search.html?q={key_s}'

	lookup(word_s) {
		const url_s = this.url_tmpl.replace('{key_s}', word_s)
		return fetch(url_s)
			.then((res) => res.text())
			.then((text) => {
				const $ = load(text)
				const table = $('table tbody tr td')
				if (!table.length) {
					console.log(chalk.red('Word not found.'))
					return null
				}

				// Word & pronunciation
				const wordEl = table.find('.rtseg').first()
				const word = wordEl.text()
					.replace(/Share:.*$/s, '')
					.replace(/\s+/g, ' ')
					.trim()
				console.log(chalk.bold.blue(word))

				// Part of speech
				const pos = table.find('.pseg i').first().text().trim()
				if (pos) {
					console.log(chalk.yellow(pos))
				}

				console.log('')

				// Definitions — handle both ds-list (numbered) and ds-single (plain)
				const defContainers = table.find('.pseg > .ds-list, .pseg > .ds-single')
				if (defContainers.length) {
					defContainers.each((_index, el) => {
						const $el = $(el)
						const isSingle = $el.hasClass('ds-single')

						if (isSingle) {
							const text = $el.text().trim()
							if (text) {
								console.log(`  ${chalk.green('•')} ${text}`)
							}
						} else {
							// Check if this has sub-definitions
							const subLists = $el.find('> .sds-list')
							if (subLists.length) {
								subLists.each((_si, subEl) => {
									const $sub = $(subEl)
									const subLabel = $sub.find('> b').first().text().trim()
									const subText = $sub.clone()
									subText.find('b').remove()
									const text = subText.text().trim()
									if (text) {
										console.log(`  ${chalk.green('•')} ${subLabel} ${text}`)
									}
								})
							} else {
								const num = $el.find('> b').first().text().trim()
								const textEl = $el.clone()
								textEl.find('b').remove()
								const defText = textEl.text().trim()
								if (defText) {
									console.log(`  ${chalk.green('•')} ${num} ${defText}`)
								}
							}
						}
					})
				}
			})
			.catch(() => {
				console.log(chalk.red('Failed to fetch data from AHD.'))
			})
	}
}

export default AhdDictionary
