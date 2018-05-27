const
  MineSweeperGame = require('./Game'),
  minimist = require('minimist'),
  inquirer = require('inquirer')

const argv = minimist(process.argv.slice(2))
console.log('argvs:', argv)

const game = new MineSweeperGame()

game.init()

game.play({ type: 'open', position: [1, 5] })
