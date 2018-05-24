const MineFields = require('./Fields')

class MineSweeperGame {
  constructor () {
    this.state = {
      board: null,
      cursorPos: null
    }
  }

  init () {
    // start a game by initiating the state
    this.minefields = new MineFields(10, 20, 50)
    console.log(this.minefields)
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
