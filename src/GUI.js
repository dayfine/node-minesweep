const
  blessed = require('blessed'),
  chalk = require('chalk')

class GUI {
  constructor (game) {
    this.game = game
    this.screen = blessed.screen({
      smartCSR: true,
      fullUnicode: true,
      autoPadding: false
    })

    this.screen.title = 'MineSweeper'
    this.boxMap = {}

    this.initGUI()
  }

  initGUI () {
    this.infoBox = blessed.box({
      top: '90%',
      left: '0%',
      width: '100%',
      height: '10%',
      content: '>>>',
      border: {
        type: 'line'
      }
    })

    this.screen.append(this.infoBox)

    const { mineFields } = this.game
    this.makeBoard(mineFields.board)

    this.screen.key(['escape', 'C-c'], (ch, key) => process.exit(0))
    this.screen.render()
  }

  makeBox (content, size, top, left) {
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

  getFieldDisplayValue (field) {
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

  makeBoard (board) {
    const size = Math.round(70 / board[0].length)

    board.forEach((row, rowIdx) => row.forEach((col, colIdx) => {
      const field = board[rowIdx][colIdx]
      const top = `${size * rowIdx}%`
      const left = `${size * colIdx}%`

      const content = this.getFieldDisplayValue(field)
      const box = this.makeBox(content, `${size}%`, top, left)
      this.boxMap[`${rowIdx}-${colIdx}`] = box
      this.screen.append(box)

      box.on('click', () => {
        this.game.play({ type: 'open', position: [rowIdx, colIdx] })
        this.infoBox.setContent(`>>> ${rowIdx}|${colIdx}`)
        this.updateBoard(board)
        this.screen.render()

        if (this.game.state.gameStatus === false) {
          this.infoBox.setContent(`You Died!!!`)
        }

        if (this.game.state.gameStatus === true) {
          this.infoBox.setContent(`You Won!!!`)
        }
      })
    }))
  }

  updateBoard (board) {
    board.forEach((row, rowIdx) => row.forEach((col, colIdx) => {
      const field = board[rowIdx][colIdx]
      const box = this.boxMap[`${rowIdx}-${colIdx}`]

      box.setContent(this.getFieldDisplayValue(field))
    }))
  }
}

module.exports = GUI
