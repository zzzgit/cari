// const os = require("os")
import dictionaryList from './list.json' with { type: 'json' }
import YoudaoDictionary from './dict/YoudaoDictionary.js'
import BingDictionary from './dict/BingDictionary.js'
import DictDictionary from './dict/DictDictionary.js'

const getDictionary = (key) => {
	const dictionary = dictionaryList.find((dict) => dict.value === key)
	switch (dictionary.value) {
	case 'youd.en.han':
		return new YoudaoDictionary()
	case 'bing.en.han':
		return new BingDictionary()
	case 'dict.en.han':
		return new DictDictionary()

	default:
		new DictDictionary()
	}
	return new DictDictionary()
}

export { getDictionary }
