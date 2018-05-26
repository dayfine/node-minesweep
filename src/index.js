const
  MineSweeperGame = require('./Game'),
  chalk = require('chalk'),
  minimist = require('minimist'),
  inquirer = require('inquirer')

const argv = minimist(process.argv.slice(2))
const game = new MineSweeperGame()

game.init()

const question = {
  name: 'initialPrompt',
  message: `what's up?`
}

inquirer
  .prompt([question])
  .then(answers => {
    console.log(answers)
  })
