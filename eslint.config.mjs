import js from 'eslint-config-janus/js.js'
import node from 'eslint-config-janus/node.js'
import { jsify } from 'eslint-config-janus/utils.js'

const ignoreArr = [{ ignores: ['built/**/*', 'dist/**/*'] }]
const jsArr = jsify([...js, ...node])

export default [
	...ignoreArr,
	...jsArr,
]

