import Tile from './tile.js'

export default class Memory {
  constructor () {
    this.currentObjectUp = undefined
    this.lastObjectUp = undefined
    this.lastEventTarget = undefined

    this.gameObject = null
    this.board = [[undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined]]

    this.values = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 0, 0].sort(
      () => 0.5 - Math.random())
    console.log(this.values)
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        this.board[i][j] = new Tile(this.values.splice(0, 1))
      }
    }
  }

  renderGame (e) {
    console.log(e)
    this.gameObject = document.createElement('div')
    this.gameObject.className = 'app'
    this.gameObject.style.left = `${e.x}px`
    this.gameObject.style.top = `${e.y}px`
    e.target.appendChild(this.gameObject)

    const gameHeader = document.createElement('div')
    gameHeader.style.width = '200px'
    gameHeader.style.height = '40px'
    this.gameObject.append(gameHeader)

    for (let i = 0; i < this.board.length; i++) {
      const buttonContainer = document.createElement('div')
      buttonContainer.style.width = '200px'
      buttonContainer.style.height = '50px'
      buttonContainer.className = 'appButtonContainer'
      this.gameObject.append(buttonContainer)

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
    this.gameObject.addEventListener('click', e => this.turnCard(e))
  }

  turnCard (e) {
    const x = parseInt(e.target.children[0].id[0])
    const y = parseInt(e.target.children[0].id[1])

    this.currentObjectUp = this.board[x][y]
    const valueCard = this.currentObjectUp.turnCard(this.currentObjectUp)
    console.log(valueCard)
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
  }
}
