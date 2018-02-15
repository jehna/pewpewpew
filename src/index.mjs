import { map, filter, compose } from './pew'
import readline from 'readline'
import fetch from 'node-fetch'

const rl = readline.createInterface({ input: process.stdin })

const testPromise = something => Promise.resolve('R: ' + something)
const duckduck = async q => fetch(`https://api.duckduckgo.com/?q=${q}&format=json`).then(res => res.json())

const onLine = rl.on.bind(rl, 'line')
const echo = async q => 'C: ' + q

compose(
  onLine,
  duckduck,
  console.log
)
