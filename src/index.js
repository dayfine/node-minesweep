const MineSweeperGame = require('./Game')
const chalk = require('chalk')
const minimist = require('minimist')

const argv = minimist(process.argv.slice(2))
const prompt = chalk.blue('\nprompt > ')

const game = new MineSweeperGame()

game.init()

process.stdout.write(prompt)
process.stdin.on('data', data => {
  console.log(`${data}`)
})
