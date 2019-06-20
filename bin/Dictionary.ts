interface Dictionary {
    /**
     * url template to form a complete url
     */
	url_tmpl: string
    /**
     * look up a word
     * @param word_s the work supposed to be looked up 
     */
	lookup(word_s: string): string
}

export default Dictionary
