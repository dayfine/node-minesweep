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

function getBoardData (board) {
  return board.map((row, rowIdx) => row.map((col, colIdx) => {
    const field = board[rowIdx][colIdx]
    return field.getDisplayValue()
  }))
}

let tableData = getBoardData(mineFields.board)
console.log(tableData)

const table = blessed.table({
  data: tableData,
  border: {
    type: 'line'
  }
})

const infoBox = blessed.box({
  top: '90%',
  left: '0%',
  width: '100%',
  height: '10%',
  content: '>>>',
  border: {
    type: 'line'
  }
})

screen.append(table)
screen.append(infoBox)

table.on('click', function ({ x, y }) {
  const { height, width } = table
  const boardHeight = mineFields.height
  const boardWitdh = mineFields.width
  const row = Math.floor(y / height * boardHeight)
  const col = Math.floor(x / width * boardWitdh)

  game.play({ type: 'open', position: [row, col] })
  table.setData(getBoardData(mineFields.board))
  infoBox.setContent(`${x}|${y}|${height}|${width}|${row}|${col}`)
  screen.render()
})

screen.key(['escape', 'C-c'], (ch, key) => process.exit(0))

screen.render()
