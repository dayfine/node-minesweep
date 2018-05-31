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

  checkField (board) {
    if (this.hasBomb) throw Error('Baaannnnnggg!!!')
    this.checkFieldBombCount(board)
  }

  checkFieldBombCount (board) {
    // this one has already been checked!
    if (this.state.checked || this.hasBomb) return
    this.state.checked = true

    const neighbours = this.getNeighbours(board)
    let bombCount = neighbours.reduce((count, field) => {
      return count + Number(field.hasBomb)
    }, 0)

    if (bombCount === 0) neighbours.forEach(_ => _.checkFieldBombCount(board))
    this.state.displayValue = bombCount === 0 ? '' : String(bombCount)
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
    if (!checked) return '?'
    if (isFlagged) return 'F'
    return displayValue
  }
}

class MineFields {
  constructor (height, width, bombCount) {
    this.height = height
    this.width = width
    this.bombCount = bombCount
    this.fieldsWithMine = []

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
      this.fieldsWithMine.push(this.board[row][col])
    }
  }

  getField (x, y) {
    return this.board[x][y]
  }

  getAllFields () {
    return this.board.reduce((ret, row) => [...ret, ...row], [])
  }
}

module.exports = MineFields
