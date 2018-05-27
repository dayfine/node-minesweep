const MineFields = require('./Fields')
const questions = require('./questions')

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
    this.cursorPos = [0, 0]
  }

  play (question, inquirer) {
    return inquirer(question)
      .then(response => {
        const nextQuestion = this.execute(question, response)
        return nextQuestion
      })
      .then(nextQuestion => {
        return this.play(nextQuestion, inquirer)
      })
  }

  execute (question, response) {
    const answer = response[question.name]

    switch (question.name) {

      // switch (response[question.name]) {
      //   case '1':
      //     console.log('Good choice boy')
      //     return {
      //       name: 'onePlusOne',
      //       message: `Now, what is 1+1?`
      //     }

      //   case 'quit':
      //     console.log('meh, quitting')
      //     return process.exit(0)

      //   default:
      //     console.log('what?')
      //     return {
      //       name: 'really?',
      //       message: `You should't do that`
      //     }
    }
  }

  updateGameState () {
    // update state based on player actoin
  }

  isGameWon () {
    this.cleanUp()
  }

  isGameOver () {
    this.cleanUp()
  }

  cleanUp () {
    this.state = {
      board: null,
      cursorPos: null
    }
  }
}

module.exports = MineSweeperGame
