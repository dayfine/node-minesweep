const blessed = require('blessed')

const screen = blessed.screen({
  smartCSR: true
})

screen.title = 'MineSweeper'

const box = blessed.box({

})

screen.append(box)

box.on('enter', () => {})

screen.key(['escape', 'C-c'], (ch, key) => process.exit(0))

box.focus()

screen.render()
