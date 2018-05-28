const
  blessed = require('blessed'),
  MineSweeperGame = require('./Game')

const game = new MineSweeperGame()
game.init()
const mineFields = game.mineFields

const screen = blessed.screen({
  smartCSR: true,
  fullUnicode: true
})

screen.title = 'MineSweeper'

function makeBox (content, size, top, left) {
  return blessed.box({
    content,
    top,
    left,
    width: size,
    height: size,
    border: {
      type: 'line'
    },
    align: 'center',
    padding: 'none',
    style: {
      fg: 'white',
      border: {
        fg: '#f0f0f0'
      },
      hover: {
        bg: 'green'
      }
    }
  })
}

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

const boxMap = {}

function updateBoard (board) {
  board.forEach((row, rowIdx) => row.forEach((col, colIdx) => {
    const field = board[rowIdx][colIdx]
    const box = boxMap[`${rowIdx}-${colIdx}`]
    box.setContent(field.getDisplayValue())
  }))
}

function makeBoard (board) {
  const size = Math.round(70 / board[0].length)

  board.forEach((row, rowIdx) => row.forEach((col, colIdx) => {
    const field = board[rowIdx][colIdx]
    const top = `${size * rowIdx}%`
    const left = `${size * colIdx}%`

    const box = makeBox(field.getDisplayValue(), `${size}%`, top, left)
    boxMap[`${rowIdx}-${colIdx}`] = box
    screen.append(box)

    box.on('click', () => {
      game.play({ type: 'open', position: [rowIdx, colIdx] })
      infoBox.setContent(`>>> ${rowIdx}|${colIdx}`)
      updateBoard(board)
      screen.render()
    })
  }))
}

makeBoard(mineFields.board)
screen.append(infoBox)

screen.key(['escape', 'C-c'], (ch, key) => process.exit(0))

screen.render()
