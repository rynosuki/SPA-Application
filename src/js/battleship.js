import Application from './application'
import BattleshipCell from './battleshipcell'

export default class Battleship extends Application {
  constructor () {
    super()
    this.appName = 'Battleship'
    this.header.innerHTML += `<h1>${this.appName}</h1>`
    this.windowBody = undefined
    this.userName = undefined
    if (sessionStorage.getItem('username') !== null) {
      this.userName = sessionStorage.getItem('username')
    }

    this.ws = new WebSocket('wss://courselab.lnu.se/message-app/socket')
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.username !== 'The Server') {
        if (data.channel === 'Battleship') {
          this.socketCommunication(data, 'receive')
        }
      }
    }

    this.game = document.createElement('div')
    this.boardContainer = document.createElement('div')
    this.opponentBoardContainer = document.createElement('div')

    this.board = []
    this.opponentBoard = []
    this.boardSize = 6
    this.ships = ['carrier', 'battleship', 'cargo']

    this.initBoards()
    this.opponentBoardContainer.addEventListener('click', e => this.gameLoop(e, 'send'))
  }

  renderWindow (e) {
    this.windowBody = e
    this.body.className = 'app'
    this.body.style.left = `${this.windowBody.clientWidth / 2}px`
    this.body.style.top = `${(this.windowBody.clientHeight - 80) / 2}px`
    this.body.style.paddingBottom = '10px'
    this.windowBody.appendChild(this.body)

    this.game.className = 'battleshipGame'
    this.main.append(this.game)

    this.boardContainer.className = 'battleshipButtonContainer'
    this.game.append(this.boardContainer)

    this.opponentBoardContainer.className = 'battleshipButtonContainer'
    this.game.append(this.opponentBoardContainer)

    for (let i = 0; i < this.boardSize; i++) {
      const row = document.createElement('div')
      row.className = 'boardRow'
      this.boardContainer.append(row)

      for (let j = 0; j < this.boardSize; j++) {
        const cell = document.createElement('div')
        cell.className = 'battleshipBoardCell'
        cell.id = `p${i}${j}`
        if (this.board[i][j].isShip) {
          cell.style.backgroundImage = `url(./img/battleship/${this.board[i][j].ship}${this.board[i][j].shipPart}.png)`
          cell.style.rotate = `${(this.board[i][j].rotation - 1) * 90}deg`
        }
        row.append(cell)
      }
    }

    for (let i = 0; i < this.boardSize; i++) {
      const row = document.createElement('div')
      row.className = 'boardRow'
      this.opponentBoardContainer.append(row)

      for (let j = 0; j < this.boardSize; j++) {
        const cell = document.createElement('div')
        cell.className = 'battleshipBoardCell'
        cell.id = `o${i}${j}`
        row.append(cell)
      }
    }
  }

  gameLoop (e, state) {
    if (state === 'send') {
      console.log(e.target.id)
      const tileX = parseInt(e.target.id[1])
      const tileY = parseInt(e.target.id[2])
      this.socketCommunication(`${tileX}${tileY}`, 'send')
    } else if (state === 'receive') {
      const tileX = parseInt(e.x)
      const tileY = parseInt(e.y)
      console.log(tileX, tileY)
      if (this.board[tileX][tileY].isShip) {
        this.board[tileX][tileY].isHit = true
        const hit = document.createElement('div')
        hit.style.backgroundImage = 'url(./img/battleship/checked.png)'
        hit.style.width = '26px'
        hit.style.height = '26px'
        hit.style.opacity = '0.5'
        const existing = document.getElementById(`p${tileX}${tileY}`)
        existing.append(hit)
        this.socketCommunication({ x: tileX, y: tileY, hit: true }, 'send')
      } else {
        this.board[tileX][tileY].isHit = true
        document.getElementById(`p${tileX}${tileY}`).style.backgroundImage = 'url(./img/battleship/checked.png)'
        this.socketCommunication({ x: tileX, y: tileY, hit: false }, 'send')
      }
    }
  }

  assignShips (i, tileX, tileY, rotation) {
    console.log(i, tileX, tileY, rotation)
    this.board[tileX][tileY].isShip = true
    this.board[tileX][tileY].ship = this.ships[i]
    this.board[tileX][tileY].shipPart = 'back'
    this.board[tileX][tileY].rotation = rotation
    switch (rotation) {
      case 1:
        this.board[tileX][tileY + 1].isShip = true
        this.board[tileX][tileY + 1].shipPart = 'middle'
        this.board[tileX][tileY + 1].ship = this.ships[i]
        this.board[tileX][tileY + 1].rotation = rotation
        this.board[tileX][tileY + 2].isShip = true
        this.board[tileX][tileY + 2].ship = this.ships[i]
        this.board[tileX][tileY + 2].shipPart = 'front'
        this.board[tileX][tileY + 2].rotation = rotation
        break
      case 2:
        this.board[tileX + 1][tileY].isShip = true
        this.board[tileX + 1][tileY].ship = this.ships[i]
        this.board[tileX + 1][tileY].shipPart = 'middle'
        this.board[tileX + 1][tileY].rotation = rotation
        this.board[tileX + 2][tileY].isShip = true
        this.board[tileX + 2][tileY].ship = this.ships[i]
        this.board[tileX + 2][tileY].shipPart = 'front'
        this.board[tileX + 2][tileY].rotation = rotation
        break
      case 3:
        this.board[tileX][tileY - 1].isShip = true
        this.board[tileX][tileY - 1].ship = this.ships[i]
        this.board[tileX][tileY - 1].shipPart = 'middle'
        this.board[tileX][tileY - 1].rotation = rotation
        this.board[tileX][tileY - 2].isShip = true
        this.board[tileX][tileY - 2].ship = this.ships[i]
        this.board[tileX][tileY - 2].shipPart = 'front'
        this.board[tileX][tileY - 2].rotation = rotation
        break
      case 4:
        this.board[tileX - 1][tileY].isShip = true
        this.board[tileX - 1][tileY].ship = this.ships[i]
        this.board[tileX - 1][tileY].shipPart = 'middle'
        this.board[tileX - 1][tileY].rotation = rotation
        this.board[tileX - 2][tileY].isShip = true
        this.board[tileX - 2][tileY].ship = this.ships[i]
        this.board[tileX - 2][tileY].shipPart = 'front'
        this.board[tileX - 2][tileY].rotation = rotation
        break
    }
  }

  initBoards () {
    for (let i = 0; i < this.boardSize; i++) {
      this.board[i] = []
      for (let j = 0; j < this.boardSize; j++) {
        this.board[i][j] = new BattleshipCell(i, j)
      }
    }

    for (let i = 0; i < this.boardSize; i++) {
      this.opponentBoard[i] = []
      for (let j = 0; j < this.boardSize; j++) {
        this.opponentBoard[i][j] = new BattleshipCell(i, j)
      }
    }

    for (let i = 0; i < this.ships.length; i++) {
      const tileX = Math.floor(Math.random() * 6)
      const tileY = Math.floor(Math.random() * 6)
      // 1 = up 2 = right 3 = down 4 = left
      let rotation = Math.floor(Math.random() * 4) + 1

      if (tileX > 3 && rotation === 2) {
        rotation = 4
      } else if (tileY > 3 && rotation === 1) {
        rotation = 3
      } else if (tileX < 2 && rotation === 4) {
        rotation = 2
      } else if (tileY < 2 && rotation === 3) {
        rotation = 1
      }

      this.assignShips(i, tileX, tileY, rotation)
    }
  }

  socketCommunication (data, type) {
    if (type === 'send') {
      console.log(data, type)
      this.ws.send(JSON.stringify({
        type: 'message',
        data,
        username: this.userName,
        channel: 'Battleship',
        key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
      }))
    } else if (type === 'receive') {
      console.log(data, type, this.userName)
      if (data.username === this.userName) {
        return
      }
      console.log(data, type)
      console.log('Hit? = ', data.data.hit)
      if (data.data.hit !== undefined) {
        const tileX = parseInt(data.data.x)
        const tileY = parseInt(data.data.y)
        console.log(tileX, tileY)
        console.log(this.opponentBoard)
        if (data.data.hit) {
          this.opponentBoard[tileX][tileY].isHit = true
          document.getElementById(`o${tileX}${tileY}`).style.backgroundImage = 'url(./img/battleship/checked.png)'
          document.getElementById(`o${tileX}${tileY}`).style.opacity = '0.5'
        } else {
          this.opponentBoard[tileX][tileY].isHit = true
          document.getElementById(`o${tileX}${tileY}`).style.backgroundImage = 'url(./img/battleship/checked.png)'
        }
      } else {
        const tileX = parseInt(data.data[0])
        const tileY = parseInt(data.data[1])
        this.gameLoop({ x: tileX, y: tileY }, 'receive')
      }
    }
  }
}
