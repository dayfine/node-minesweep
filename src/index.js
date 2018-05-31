const
  MineSweeperGame = require('./Game'),
  GUI = require('./GUI')

const game = new MineSweeperGame()
game.init()
const gameGUI = new GUI(game)
