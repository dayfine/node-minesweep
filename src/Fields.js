class Field {
  constructor ([x, y], hasBomb = false) {
    // A field might have bomb. A field also need to know its coord to
    // get its neighbours
    this.x = x
    this.y = y
    this.hasBomb = hasBomb

    this.state = {
      displayValue: '',
      checked: false,
      isFlagged: false
    }
  }

  inspect (depth, opts) {
    return `<Field bomb:${this.hasBomb}>`
  }

  checkField(board) {
    this.state.checked
      ? this.checkNeighbours(board)
      : this.checkFieldBombCount(board)
  }

  checkFieldBombCount (board, skip = false, trigger = true) {
    if (this.state.checked || this.state.isFlagged) return
    if (this.hasBomb && skip) return

    this.state.checked = true
    if (this.hasBomb) {
      this.state.displayValue = 'B'
      if (trigger) throw Error('Baaannnnnggg!!!')
      return
    }

    const neighbours = this.getNeighbours(board)
    const bombCount = neighbours.reduce((sum, _) => sum + Number(_.hasBomb), 0)

    if (bombCount === 0) {
      neighbours.forEach(_ => _.checkFieldBombCount(board))
    } else {
      this.state.displayValue = String(bombCount)
    }
  }

  checkNeighbours (board) {
    const neighbours = this.getNeighbours(board)
    neighbours.forEach(_ => _.checkFieldBombCount(board, true))
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
        if (nx >= 0 && nx < height && ny >= 0 && ny < width) {
          neighbours.push(board[nx][ny])
        }
      })

    return neighbours
  }

  getDisplayValue () {
    const { checked, isFlagged, displayValue } = this.state
    if (isFlagged) return 'F'
    if (!checked) return '?'
    return displayValue
  }
}

class MineFields {
  constructor (height, width, bombCount) {
    this.height = height
    this.width = width
    this.bombCount = bombCount

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

    const totalFieldCount = this.height * this.width
    if (bombCount > totalFieldCount) {
      throw new RangeError('Bomb count is larger than the size of the board')
    }

    const seen = new Set()
    while (seen.size < bombCount) {
      const idx = getRandomInt(0, totalFieldCount)
      if (seen.has(idx)) continue

      seen.add(idx)
      const row = Math.floor(idx / this.width)
      const col = idx % this.width
      this.board[row][col].hasBomb = true
    }
  }

  getField (x, y) {
    return this.board[x][y]
  }

  getAllFields () {
    return this.board.reduce((ret, row) => [...ret, ...row], [])
  }

  showAllFields () {
    this.getAllFields().forEach(_ => _.checkFieldBombCount(this.board, false, false))
  }
}

module.exports = MineFields
