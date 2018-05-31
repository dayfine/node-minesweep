const
  MineSweeperGame = require('./Game'),
  minimist = require('minimist'),
  inquirer = require('inquirer'),
  GUI = require('./GUI')

const argv = minimist(process.argv.slice(2))
console.log('argvs:', argv)

const game = new MineSweeperGame()
game.init()
const gameGUI = new GUI(game)
