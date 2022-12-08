import Application from './application.js'
import Tile from './tile.js'

export default class Memory extends Application {
  constructor () {
    super()
    this.appName = 'Memory'
    this.currentObjectUp = undefined
    this.lastObjectUp = undefined
    this.lastEventTarget = undefined
    this.won = false
    this.moves = 0

    this.board = [[undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined]]

    this.values = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 0, 0].sort(
      () => 0.5 - Math.random())
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        this.board[i][j] = new Tile(this.values.splice(0, 1))
      }
    }
  }

  renderGame (e) {
    console.log(e)

    this.body.className = 'app'
    this.body.style.left = `${e.clientWidth / 2}px`
    this.body.style.top = `${(e.clientHeight - 80) / 2}px`
    this.body.style.paddingBottom = '10px'
    e.appendChild(this.body)

    this.header.innerHTML += this.appName

    for (let i = 0; i < this.board.length; i++) {
      const buttonContainer = document.createElement('div')
      buttonContainer.style.width = '200px'
      buttonContainer.style.height = '50px'
      buttonContainer.className = 'appButtonContainer'
      buttonContainer.style.paddingLeft = '10px'
      buttonContainer.style.paddingRight = '10px'
      this.main.append(buttonContainer)

      for (let j = 0; j < this.board[i].length; j++) {
        const buttonDiv = document.createElement('div')
        buttonDiv.style.width = '50px'
        buttonDiv.style.height = '50px'
        buttonDiv.style.backgroundImage = 'url(../img/memory/none.png)'
        buttonContainer.append(buttonDiv)

        const workButton = document.createElement('button')
        workButton.id = `${i}${j}`
        workButton.style.width = '50px'
        workButton.style.height = '50px'
        workButton.style.display = 'none'
        buttonDiv.append(workButton)
      }
    }
    this.main.addEventListener('click', e => this.turnCard(e))
  }

  turnCard (e) {
    if (!this.won) {
      this.moves++
      const x = parseInt(e.target.children[0].id[0])
      const y = parseInt(e.target.children[0].id[1])

      this.currentObjectUp = this.board[x][y]
      const valueCard = this.currentObjectUp.turnCard(this.currentObjectUp)
      e.target.style.backgroundImage = `url(../img/memory/${valueCard}.png)`
      if (this.lastObjectUp !== undefined) {
        if (this.currentObjectUp.getValue() === this.lastObjectUp.getValue()) {
          this.lastObjectUp.setComplete()
          this.currentObjectUp.setComplete()
        } else {
          this.lastEventTarget.style.backgroundImage = `url(../img/memory/${this.lastObjectUp.turnBack()}.png)`
          e.target.style.backgroundImage = `url(../img/memory/${this.currentObjectUp.turnBack()}.png)`
        }
        this.lastObjectUp = undefined
        this.currentObjectUp = undefined
      }
      this.lastEventTarget = e.target
      this.lastObjectUp = this.currentObjectUp
      let finishedCards = 0
      for (const i of this.board) {
        for (const j of i) {
          if (j.complete) {
            finishedCards++
          }
        }
      }
      if (finishedCards === 16) {
        const winMessage = document.createElement('div')
        winMessage.style.width = `${this.body.clientWidth / 2}px`
        winMessage.style.height = `${this.body.clientHeight / 2}px`
        winMessage.style.background = 'brown'
        winMessage.style.position = 'absolute'
        winMessage.style.top = '65px'
        winMessage.style.left = '55px'
        winMessage.style.display = 'flex'
        winMessage.style.justifyContent = 'center'
        winMessage.style.alignItems = 'center'

        const winText = document.createElement('label')
        winText.innerHTML = `You WON in ${this.moves / 2} moves!`
        winMessage.append(winText)
        this.body.append(winMessage)
        this.won = true
      }
    }
  }
}
