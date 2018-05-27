const
  blessed = require('blessed'),
  chalk = require('chalk'),
  MineSweeperGame = require('./Game')

const game = new MineSweeperGame()

game.init()
const mineFields = game.mineFields

const screen = blessed.screen({
  smartCSR: true,
  fullUnicode: true
})

screen.title = 'MineSweeper'

function drawBoard (board) {
  const data = board.map((row, rowIdx) => row.map((col, colIdx) => {
    const field = board[rowIdx][colIdx]
    return field.getDisplayValue()
  }))

  return blessed.table({ data, border: { type: 'line' } })
}

let table = drawBoard(mineFields.board)
screen.append(table)

table.on('click', function ({ x, y }) {
  const { height, width } = screen
  const tableHeight = mineFields.height
  const tableWitdh = mineFields.width
  const row = Math.floor(y / height * tableHeight)
  const col = Math.floor(x / width * tableWitdh)

  game.play({ type: 'open', position: [row, col] })
  table.destroy()
  table = drawBoard(mineFields.board)
  screen.append(table)
  screen.render()
})

screen.key(['escape', 'C-c'], (ch, key) => process.exit(0))

screen.render()
