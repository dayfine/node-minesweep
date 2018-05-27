const
  MineSweeperGame = require('./GameControl'),
  chalk = require('chalk'),
  minimist = require('minimist'),
  inquirer = require('inquirer')

const argv = minimist(process.argv.slice(2))
console.log(argv)

const game = new MineSweeperGame()

game.init()

const initialPrompt = {
  name: 'initialPrompt',
  message: `what's up?`
}

const myInquirer = question => {
  return inquirer.prompt([question])
}

// game.play(initialPrompt, myInquirer)

const waitInterval = 500
const totalTime = 5000
let currentInterval = 0

function showPercentage (percentage) {
  process.stdout.clearLine()
  process.stdout.cursorTo(0)
  process.stdout.write(`Processing ${chalk.red(percentage)}%...`)
}

const interval = setInterval(() => {
  currentInterval += waitInterval
  showPercentage((currentInterval / totalTime) * 100)
}, waitInterval)

setTimeout(() => clearInterval(interval), totalTime)
