const
  blessed = require('blessed'),
  chalk = require('chalk'),
  MineSweeperGame = require('./Game')

const game = new MineSweeperGame()

game.init()

const screen = blessed.screen({
  smartCSR: true,
  fullUnicode: true
})

screen.title = 'MineSweeper'

function makeBox (content, size, parent) {
  return blessed.box({
    content,
    parent,
    width: size,
    height: 'auto',
    border: {
      type: 'line'
    },
    style: {
      border: {
        fg: '#f0f0f0'
      },
      hover: {
        bg: '#0f0f0f'
      }
    }
  })
}

function drawMineFields (mineFields) {
  const data = mineFields.map((row, rowIdx) => row.map((col, colIdx) => {
    const field = mineFields[rowIdx][colIdx]
    return field.getDisplayValue()
  }))

  return blessed.table({ data, border: { type: 'line' } })
}

const table = drawMineFields(game.mineFields.board)
screen.append(table)

screen.on('click', () => {
  game.play({ type: '', position: [] })
})

screen.key(['escape', 'C-c'], (ch, key) => process.exit(0))

screen.render()
