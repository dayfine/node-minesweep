class Field {
  constructor ([x, y], hasBomb = false) {
    // A field might have bomb. A field also need to know its coord to
    // get its neighbours
    this.x = x
    this.y = y
    this.hasBomb = hasBomb

    this.state = {
      displayValue: null,
      isFlagged: false
    }
  }

  inspect (depth, opts) {
    return `<Field bomb:${this.hasBomb}>`
  }

  checkFieldBombCount (board) {
    // this one has already been checked!
    if (this.state.displayValue) return

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
    // feel free to unflag it
    this.state.isFlagged = !this.state.isFlagged
  }

  getNeighbours (board) {
    const height = board.length
    const width = board[0].length
    const neighbours = []

    ;[[1, 1], [1, 0], [1, -1], [0, 1], [0, -1], [-1, 1], [-1, 0], [-1, -1]]
      .forEach(([x, y]) => {
        const nx = this.x + x
        const ny = this.y + y
        if (nx >= 0 && nx <= height && ny >= 0 && ny <= width) {
          neighbours.push(board[nx][ny])
        }
      })

    return neighbours
  }

  getDisplayValue () {
    const displayValue = this.state.displayValue || '?'
    return this.state.isFlagged ? 'F' : displayValue
  }
}

class MineFields {
  constructor (height, width, bombCount) {
    this.height = height
    this.width = width
    this.bombCount = this.bombCount

    // make 2-D array as board
    this.board = [...new Array(height)].map((_, row) => {
      return [...new Array(width)].map((_, col) => {
        return new Field([row, col])
      })
    })

    this.assignBombs(bombCount)
  }

  assignBombs (bombCount) {
    // randomly assign the given number of bombs to the board
    function getRandomInt (min, max) {
      return Math.floor(Math.random() * (max - min)) + min
    }
    const height = this.board.length
    const width = this.board[0].length
    const totalFieldCount = height * width

    if (bombCount > totalFieldCount) {
      throw new RangeError('Bomb count is larger than the size of the board')
    }

    const seen = new Set()
    while (seen.size < bombCount) {
      const idx = getRandomInt(0, totalFieldCount)
      if (seen.has(idx)) continue

      seen.add(idx)
      const row = Math.floor(idx / width)
      const col = idx % width
      this.board[row][col].hasBomb = true
    }
  }

  getField (x, y) {
    return this.board[x][y]
  }
}

module.exports = MineFields
