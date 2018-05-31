const
  MineSweeperGame = require('./Game')
  blessed = require('blessed'),
  chalk = require('chalk')

class GUI {
  constructor () {
    this.game = null
    this.board = null
    this.screen = null
    this.boxMap = {}
    this.focusedFieldIdx = null

    this.initGame()
    this.initGUI()
  }

  initGame () {
    this.game = new MineSweeperGame()
    this.game.init()
    this.board = this.game.mineFields.board
  }

  initGUI () {
    this.screen = blessed.screen({
      smartCSR: true,
      fullUnicode: true,
      autoPadding: false
    })


    this.screen.title = 'MineSweeper'

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
    this.makeBoard()

    this.screen.key(['escape', 'C-c'], (ch, key) => process.exit(0))
    this.screen.key('f', () => {
      if (!this.focusedFieldIdx) return;

      const [rowIdx, colIdx] = this.focusedFieldIdx
      this.game.play({ type: 'flag', position: [rowIdx, colIdx] })
      this.updateBoard()
    })
    this.screen.key('space', () => this.gameMoveCallBack(this.focusedFieldIdx))
    this.screen.key('r', () => {
      this.resetGame()
      this.infoBox.setContent(`Go Again!`)
    })

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

  makeBoard () {
    const size = Math.round(85 / this.board[0].length)

    this.board.forEach((row, rowIdx) => row.forEach((col, colIdx) => {
      const field = this.board[rowIdx][colIdx]
      const top = `${size * rowIdx}%`
      const left = `${size * colIdx}%`

      const content = this.getFieldDisplayValue(field)
      const box = this.makeBox(content, `${size}%`, top, left)
      this.boxMap[`${rowIdx}-${colIdx}`] = box
      this.screen.append(box)

      box.on('click', () => this.gameMoveCallBack([rowIdx, colIdx]))
      box.on('mouseover', () => {
        this.focusedFieldIdx = [rowIdx, colIdx]
      })
    }))
  }

  gameMoveCallBack ([rowIdx, colIdx]) {
    this.game.play({ type: 'open', position: [rowIdx, colIdx] })
      this.updateBoard()

      if (this.game.state.gameStatus === false) {
        this.infoBox.setContent(`You Hit Bomb!!!`)
        this.screen.render()
      }

      if (this.game.state.gameStatus === true) {
        this.infoBox.setContent(`You Won!!!`)
        this.screen.render()
      }
  }

  updateBoard () {
    this.board.forEach((row, rowIdx) => row.forEach((col, colIdx) => {
      const field = this.board[rowIdx][colIdx]
      const box = this.boxMap[`${rowIdx}-${colIdx}`]

      box.setContent(this.getFieldDisplayValue(field))
    }))

    this.screen.render()
  }

  resetGame () {
    this.boxMap = {}
    this.focusedFieldIdx = null
    this.screen.destroy()

    this.initGame()
    this.initGUI()
  }
}

module.exports = GUI
