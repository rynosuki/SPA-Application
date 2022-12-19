import Application from './application'

export default class Battleship extends Application {
  constructor () {
    super()
    this.appName = 'Battleship'
    this.header.innerHTML += `<h1>${this.appName}</h1>`
    this.windowBody = undefined

    this.board = []
    this.boardSize = 6
    this.ships = ['carrier', 'battleship', 'cargo', 'submarine']
    for (let i = 0; i < this.boardSize; i++) {
      this.board[i] = []
      for (let j = 0; j < this.boardSize; j++) {
        this.board[i][j] = 0
      }
    }
  }

  renderWindow (e) {
    this.windowBody = e
    this.body.className = 'app'
    this.body.style.left = `${this.windowBody.clientWidth / 2}px`
    this.body.style.top = `${(this.windowBody.clientHeight - 80) / 2}px`
    this.body.style.paddingBottom = '10px'
    this.windowBody.appendChild(this.body)

    const boardContainer = document.createElement('div')
    boardContainer.className = 'battleshipButtonContainer'
    this.main.append(boardContainer)

    for (let i = 0; i < this.boardSize; i++) {
      const row = document.createElement('div')
      row.className = 'boardRow'
      boardContainer.append(row)

      for (let j = 0; j < this.boardSize; j++) {
        const cell = document.createElement('div')
        cell.className = 'battleshipBoardCell'
        cell.id = `${i}${j}`
        row.append(cell)
      }
    }
  }
}
