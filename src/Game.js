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
    this.mineFields = new MineFields(24, 24, 99)
    this.cursorPos = [0, 0]
  }

  play (action) {
    const [x, y] = action.position
    const field = this.mineFields.getField(x, y)

    switch (action.type) {
      case 'open':
        field.checkFieldBombCount(this.mineFields.board)
        break
      case 'flag':
        field.flagAsBomb()
        break
      default:
        break
    }
  }

  updateGameState () {
    // update state based on player actoin
  }

  isGameWon () {
    console.log('you won!')
    this.cleanUp()
  }

  isGameOver () {
    console.log('you lose!')
    this.cleanUp()
  }

  cleanUp () {
    this.state = {
      board: null,
      cursorPos: null
    }
  }
}

module.exports = MineSweeperGame
