import dictionaryList from './list.json' with { type: 'json' }
import YoudaoDictionary from './dict/YoudaoDictionary.js'
import DictDictionary from './dict/DictDictionary.js'
import AhdDictionary from './dict/AhdDictionary.js'

const getDictionary = (key) => {
	const dictionary = dictionaryList.find((dict) => dict.value === key)
	switch (dictionary.value) {
	case 'youd.en.han':
		return new YoudaoDictionary()
	case 'dict.en.han':
		return new DictDictionary()
	case 'ahd.en.en':
		return new AhdDictionary()

	default:
		return new DictDictionary()
	}
}

export { getDictionary }
