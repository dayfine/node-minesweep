const MineFields = require('./Fields')

class MineSweeperGame {
  constructor () {
    this.state = {
      board: null,
      cursorPos: null
    }
  }

  init () {
    // start a game by initiating the state
    this.minefields = new MineFields(10, 20, 50)
  }

  play (question, inquirer) {
    return inquirer(question)
      .then(response => {
        const [info, nextQuestion] = this.execute(question, response)
        console.log(info)
        return nextQuestion
      })
      .then(nextQuestion => {
        return this.play(nextQuestion, inquirer)
      })
  }

  execute (question, response) {
    switch (response[question.name]) {
      case '1':
        return ['Good choice boy', {
          name: 'onePlusOne',
          message: `Now, what is 1+1?`
        }]

      case 'quit':
        console.log('meh, quitting')
        return process.exit(0)

      default:
        return ['what?', {
          name: 'really?',
          message: `You should't do that`
        }]
    }
  }

  updateGameState () {
    // update state based on player actoin
  }

  isGameWon () {

  }

  isGameOver () {

  }
}

module.exports = MineSweeperGame
