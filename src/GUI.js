const
  blessed = require('blessed'),
  chalk = require('chalk'),
  MineSweeperGame = require('./Game')

const game = new MineSweeperGame()
game.init()
const mineFields = game.mineFields

const screen = blessed.screen({
  smartCSR: true,
  fullUnicode: true,
  autoPadding: false
})

screen.title = 'MineSweeper'

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

function makeBox (content, size, top, left) {
  return blessed.box({
    content,
    top,
    left,
    width: size,
    height: 'shrink',
    border: {
      type: 'line'
    },
    shrink: true,
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

function getDisplayValue (field) {
  const value = field.getDisplayValue()

  switch (value) {
    case '1':
      return chalk.blue('1')
    case '2':
      return chalk.green('2')
    case '3':
      return chalk.red('3')
    case '4':
      return chalk.cyan('4')
    case '5':
      return chalk.gray('5')
    default:
      return value
  }
}

const boxMap = {}

function updateBoard (board) {
  board.forEach((row, rowIdx) => row.forEach((col, colIdx) => {
    const field = board[rowIdx][colIdx]
    const box = boxMap[`${rowIdx}-${colIdx}`]

    box.setContent(getDisplayValue(field))
  }))
}

function makeBoard (board) {
  const size = Math.round(70 / board[0].length)

  board.forEach((row, rowIdx) => row.forEach((col, colIdx) => {
    const field = board[rowIdx][colIdx]
    const top = `${size * rowIdx}%`
    const left = `${size * colIdx}%`

    const box = makeBox(getDisplayValue(field), `${size}%`, top, left)
    boxMap[`${rowIdx}-${colIdx}`] = box
    screen.append(box)

    box.on('click', () => {
      game.play({ type: 'open', position: [rowIdx, colIdx] })
      infoBox.setContent(`>>> ${rowIdx}|${colIdx}`)
      updateBoard(board)
      screen.render()

      if (game.state.gameStatus === false) {
        infoBox.setContent(`You Died`)
      }
    })
  }))
}

makeBoard(mineFields.board)
screen.append(infoBox)

screen.key(['escape', 'C-c'], (ch, key) => process.exit(0))

screen.render()
