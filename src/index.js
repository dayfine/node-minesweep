const
  MineSweeperGame = require('./Game'),
  chalk = require('chalk'),
  minimist = require('minimist'),
  inquirer = require('inquirer')

const argv = minimist(process.argv.slice(2))
const game = new MineSweeperGame()

game.init()

const initialPrompt = {
  name: 'initialPrompt',
  message: `what's up?`
}

const myInquirer = question => {
  return inquirer.prompt([question])
}

game.play(initialPrompt, myInquirer)
