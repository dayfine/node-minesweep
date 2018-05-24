class Field {
  constructor ([x, y], hasBomb = false) {
    // A field might have bomb. A field also need to know its coord to
    // get its neighbours
    this.x = x
    this.y = y
    this.hasBomb = hasBomb

    this.state = {
      displayValue: null,
      flagged: false
    }
  }

  checkFieldBombCount (board) {
    const neighbours = board.getNeighbours(this)

    let bombCount = 0
    neighbours.forEach(field => {
      if (field.hasBomb) {
        bombCount += 1
      } else {
        board.getNeighbours(field).forEach(_ => _.checkFieldBombCount(board))
      }
    })

    this.state.displayValue = bombCount
  }

  flagAsBomb () {
    this.state.flagged = true
  }
}

class MineFields {
  constructor (height, width, bombCount) {
    // make 2-D array as board
    this.height = height
    this.width = width

    this.board = []
  }

  assignBombs (bombCount) {
    // randomly assign the given number of bombs to the board
  }

  getNeighbours (field) {
    const neighbours = []
    ;[[1, 1], [1, 0], [1, -1], [0, 1], [0, -1], [-1, 1], [-1, 0], [-1, -1]]
      .forEach(([x, y]) => {
        const nx = field.x + x
        const ny = field.y + y
        if (nx >= 0 && nx <= this.height && ny >= 0 && ny <= this.width) {
          neighbours.push(this.board[nx][ny])
        }
      })

    return neighbours
  }
}

export default MineFields
