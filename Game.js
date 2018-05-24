const MineFields = require('./Fields')

class MineSweeperGame {
  constructor () {
    this.state = {
    }
  }

  init () {
    // start a game by initiating the state
    this.minefields = new MineFields(10, 20, 10)
  }

  updateGameState () {
    // update state based on player actoin
  }

  isGameWon () {

  }

  isGameOver () {

  }
}

module.exports = MineSweeperGame
