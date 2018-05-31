const MineFields = require('./Fields')

class MineSweeperGame {
  constructor () {
    this.state = {
      board: null,
      gameStatus: null
    }
  }

  init (height = 8, width = 8, numBombs = 10) {
    // start a game by initiating the state
    this.mineFields = new MineFields(height, width, numBombs)
  }

  play (action) {
    const [x, y] = action.position
    const field = this.mineFields.getField(x, y)

    switch (action.type) {
      case 'open':
        try {
          field.checkField(this.mineFields.board)
        } catch (e) {
          this.state.gameStatus = false
          this.mineFields.showAllFields()
        }
        break
      case 'flag':
        field.flagAsBomb()
        break
      default:
        break
    }

    // check if game is won
    const allchecked = this.mineFields.getAllFields().every(field => {
      if (field.hasBomb && field.state.isFlagged) return true
      if (!field.hasBomb && field.state.checked) return true
      return false
    })

    if (allchecked) {
      this.state.gameStatus = true
    }
  }

  isGameWon () {
    return this.state.gameStatus === true
  }

  isGameOver () {
    return this.state.gameStatus === false
  }

  cleanUp () {
    this.state = {
      board: null,
      gameStatus: null
    }
  }
}

module.exports = MineSweeperGame
