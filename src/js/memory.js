import Application from './application.js'
import Tile from './tile.js'

export default class Memory extends Application {
  constructor () {
    super()
    this.appName = 'Memory'
    this.windowBody = undefined
    this.currentObjectUp = undefined
    this.lastObjectUp = undefined
    this.lastEventTarget = undefined
    this.won = false
    this.moves = 0
    this.winAmount = 16

    this.board = [[undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined]]
    this.main.addEventListener('click', e => this.turnCard(e.target))
    this.main.addEventListener('keypress', e => this.turnCard(e.target))

    this.header.innerHTML += `<h1>${this.appName}</h1>`

    this.values = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 0, 0].sort(
      () => 0.5 - Math.random())

    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        this.board[i][j] = new Tile(this.values.splice(0, 1))
      }
    }
  }

  renderGame (e) {
    if (this.windowBody === undefined) {
      this.windowBody = e
    }
    this.body.className = 'app'
    this.body.style.left = `${this.windowBody.clientWidth / 2}px`
    this.body.style.top = `${(this.windowBody.clientHeight - 80) / 2}px`
    this.body.style.paddingBottom = '10px'
    this.windowBody.appendChild(this.body)

    for (let i = 0; i < this.board.length; i++) {
      const buttonContainer = document.createElement('div')
      buttonContainer.className = 'memoryButtonContainer'
      this.main.append(buttonContainer)

      for (let j = 0; j < this.board[i].length; j++) {
        const buttonDiv = document.createElement('div')
        buttonDiv.className = 'memoryButtons'
        buttonDiv.tabIndex = 0
        buttonContainer.append(buttonDiv)

        const workButton = document.createElement('button')
        workButton.id = `${i}${j}`
        buttonDiv.append(workButton)
      }
    }

    this.main.innerHTML += `
    <select id = "myList">  
    <option> ---Board Size--- </option>  
    <option> 4x4 </option>  
    <option> 2x4 </option>  
    <option> 2x2 </option>  
    </select>
    `
    this.main.querySelector('#myList').addEventListener('change', e => this.changeBoardSize(e))
  }

  turnCard (target) {
    if (!this.won) {
      this.moves++
      const x = parseInt(target.children[0].id[0])
      const y = parseInt(target.children[0].id[1])

      this.currentObjectUp = this.board[x][y]
      const valueCard = this.currentObjectUp.turnCard(this.currentObjectUp)
      console.log('Last object = ', this.lastObjectUp, 'Current object = ', this.currentObjectUp)
      target.style.backgroundImage = `url(../img/memory/${valueCard}.png)`
      if (this.lastObjectUp !== undefined) {
        if (this.currentObjectUp.getValue() === this.lastObjectUp.getValue()) {
          this.lastObjectUp.setComplete()
          this.currentObjectUp.setComplete()
        } else {
          this.lastEventTarget.style.backgroundImage = 'url(../img/memory/none.png)'
          target.style.backgroundImage = 'url(../img/memory/none.png)'
        }
        this.lastObjectUp = undefined
        this.currentObjectUp = undefined
      }
      this.lastEventTarget = target
      this.lastObjectUp = this.currentObjectUp
      this.currentObjectUp = undefined
      let currentMoves = 0
      for (const i of this.board) {
        for (const j of i) {
          if (j.complete) {
            currentMoves++
          }
        }
      }
      if (currentMoves === this.winAmount) {
        const winMessage = document.createElement('div')
        winMessage.className = 'memoryWinMessage'
        winMessage.style.width = `${this.body.clientWidth / 2}px`
        winMessage.style.height = `${this.body.clientHeight / 2}px`

        const winText = document.createElement('label')
        winText.innerHTML = `You WON in ${this.moves / 2} moves!`
        winMessage.append(winText)
        this.body.append(winMessage)
        this.won = true
      }
    }
  }

  changeBoardSize (e) {
    const newSize = e.target.options[e.target.selectedIndex].text
    console.log(this.main)
    while (this.main.firstChild) {
      this.main.removeChild(this.main.lastChild)
    }
    console.log(this.main)
    this.currentObjectUp = undefined
    this.lastObjectUp = undefined
    this.lastEventTarget = undefined
    this.won = false
    this.moves = 0

    const x = parseInt(newSize[0])
    const y = parseInt(newSize[2])
    this.winAmount = (x * y)

    this.values = []
    for (let i = 0; i < x * y; i++) {
      this.values.push(Math.floor(i / 2))
    }
    this.values.sort(() => 0.5 - Math.random())

    this.board = []
    for (let i = 0; i < x; i++) {
      this.board.push([])
      for (let j = 0; j < y; j++) {
        this.board[i][j] = new Tile(this.values.splice(0, 1))
      }
    }

    this.renderGame()
  }
}
