const os = require("os")
const dictionaryList = require("./list.json")
import YoudaoDictionary from "./dict/YoudaoDictionary"
import BingDictionary from "./dict/BingDictionary";
import DictDictionary from "./dict/DictDictionary";

const getDictionary = (key) => {
	let dictionary = dictionaryList.find(dict => dict.value === key)
	switch (dictionary.value) {
		case "youd.en.han":
			return new YoudaoDictionary()
		case "bing.en.han":
			return new BingDictionary()
		case "dict.en.han":
			return new DictDictionary()

		default:
			new DictDictionary()
	}
	return new DictDictionary()
}

module.exports = { getDictionary }
