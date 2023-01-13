import Application from './application'
import BattleshipCell from './battleshipcell'

export default class Battleship extends Application {
  /**
   * Initialization of the Battleship game.
   */
  constructor () {
    super()
    this.appName = 'Battleship'
    this.header.innerHTML += `<h1>${this.appName}</h1>`
    this.windowBody = undefined
    this.userName = undefined
    this.myTurn = false
    this.gameStarted = false
    this.hitsOnMe = 0
    if (sessionStorage.getItem('username') !== null) {
      this.userName = sessionStorage.getItem('username')
    }

    // Create websocket connection.
    this.ws = new WebSocket('wss://courselab.lnu.se/message-app/socket')
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.username !== 'The Server') {
        if (data.channel === 'Battleship') {
          this.wsRecieve(data)
        }
      }
    }

    // Create the gameboard divs.
    this.game = document.createElement('div')
    this.gameBody = document.createElement('div')
    this.gameBody.className = 'battleshipGameBody'
    this.boardContainer = document.createElement('div')
    this.opponentBoardContainer = document.createElement('div')
    this.gameBody.append(this.boardContainer)
    this.gameBody.append(this.opponentBoardContainer)
    this.turnText = document.createElement('p')

    this.board = undefined
    this.opponentBoard = undefined
    this.boardSize = 6
    this.ships = ['carrier', 'battleship', 'cargo']

    this.initBoards()
    this.opponentBoardContainer.addEventListener('click', e => this.gameLoopSend(e))
  }

  /**
   * Render the boardwindow.
   *
   * @param {*} e Event that was called to open the window.
   */
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
    this.opponentBoardContainer.className = 'battleshipButtonContainer'

    this.game.append(this.gameBody)
    this.game.append(this.turnText)

    // Create the playerboard and render ships.
    for (let i = 0; i < this.boardSize; i++) {
      const row = document.createElement('div')
      row.className = 'boardRow'
      this.boardContainer.append(row)

      for (let j = 0; j < this.boardSize; j++) {
        const cell = document.createElement('div')
        cell.className = 'battleshipBoardCell'
        cell.id = `p${i}${j}`
        if (this.board[i][j].isShip) {
          cell.style.backgroundImage = `url(${this.board[i][j].getImageSrc()})`
          cell.style.rotate = `${(this.board[i][j].rotation - 1) * 90}deg`
        }
        row.append(cell)
      }
    }

    // Create the opponent board and the cells.
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

  /**
   * Send loop of the game.
   *
   * @param {*} e Event been sent.
   */
  gameLoopSend (e) {
    // Grab the X/Y coordinates that was clicked and send it to the server.
    // If game hasnt been started it initiates a connection to the other player if present.
    if (this.myTurn && this.gameStarted) {
      const tileX = parseInt(e.target.id[1])
      const tileY = parseInt(e.target.id[2])
      if (this.opponentBoard[tileX][tileY].isHit) {
        return
      }
      this.wsSend(`${tileX}${tileY}`)
      this.myTurn = false
      this.turnText.innerHTML = 'Waiting for opponent...'
    } else if (this.gameStarted === false) {
      this.wsSend({ question: 'myturn?', answer: null })
    }
  }

  /**
   * Recieve loop of the game.
   *
   * @param {*} e Event been recieved.
   */
  gameLoopRecieve (e) {
    // Checks whether the coordinates that was recieved is a ship.
    // If it is a ship it will send a hit to the other player.
    // If it is not a ship it will send a miss to the other player.
    const tileX = parseInt(e.x)
    const tileY = parseInt(e.y)
    if (this.board[tileX][tileY].isShip) {
      this.board[tileX][tileY].isHit = true
      this.hitsOnMe++
      const hit = document.createElement('div')
      hit.style.backgroundImage = `url(${this.board[tileX][tileY].imgSrc.checked})`
      hit.style.width = '26px'
      hit.style.height = '26px'
      hit.style.opacity = '0.5'
      const existing = document.getElementById(`p${tileX}${tileY}`)
      existing.append(hit)
      this.wsSend({ x: tileX, y: tileY, hit: true })
    } else {
      this.board[tileX][tileY].isHit = true
      document.getElementById(`p${tileX}${tileY}`).style.backgroundImage = `url(${this.board[tileX][tileY].imgSrc.checked})`
      this.wsSend({ x: tileX, y: tileY, hit: false })
    }
    if (this.hitsOnMe === 9) {
      this.turnText.innerHTML = 'You lost!'
      this.myTurn = false
      this.gameStarted = false
      this.wsSend({ question: 'winner', answer: true })
    }
  }

  /**
   * Initializes the boards.
   */
  initBoards () {
    this.board = []
    this.opponentBoard = []
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

    if (this.assignShips() === false) {
      this.initBoards()
    }
  }

  /**
   * Assigns the ships to the board.
   *
   * @returns {boolean} If the ships was assigned or not.
   */
  assignShips () {
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

      // Assigns the ships to the board, together with part and rotation.
      switch (rotation) {
        case 1:
          if (this.board[tileX][tileY + 1].isShip || this.board[tileX][tileY + 2].isShip) {
            this.assignShips(i, tileX, tileY, rotation + 1)
            return false
          }
          this.board[tileX][tileY + 1].setupShip(this.ships[i], 'middle', rotation)
          this.board[tileX][tileY + 2].setupShip(this.ships[i], 'front', rotation)
          break
        case 2:
          if (this.board[tileX + 1][tileY].isShip || this.board[tileX + 2][tileY].isShip) {
            this.assignShips(i, tileX, tileY, rotation + 1)
            return false
          }
          this.board[tileX + 1][tileY].setupShip(this.ships[i], 'middle', rotation)
          this.board[tileX + 2][tileY].setupShip(this.ships[i], 'front', rotation)
          break
        case 3:
          if (this.board[tileX][tileY - 1].isShip || this.board[tileX][tileY - 2].isShip) {
            this.assignShips(i, tileX, tileY, rotation + 1)
            return false
          }
          this.board[tileX][tileY - 1].setupShip(this.ships[i], 'middle', rotation)
          this.board[tileX][tileY - 2].setupShip(this.ships[i], 'front', rotation)
          break
        case 4:
          if (this.board[tileX - 1][tileY].isShip || this.board[tileX - 2][tileY].isShip) {
            this.assignShips(i, tileX, tileY, 1)
            return false
          }
          this.board[tileX - 1][tileY].setupShip(this.ships[i], 'middle', rotation)
          this.board[tileX - 2][tileY].setupShip(this.ships[i], 'front', rotation)
          break
      }
      if (this.board[tileX][tileY].isShip) {
        return false
      }
      this.board[tileX][tileY].setupShip(this.ships[i], 'back', rotation)
    }
    return true
  }

  /**
   * WebSocket recieve function, determines what to do with the data.
   *
   * @param {*} data Data being recieved from websocket
   */
  wsRecieve (data) {
    // Make sure not same user.
    if (data.username === this.userName) {
      return
    }
    // If game is not started, start it. Else, continue with game.
    if (data.data.question === 'myturn?' && this.gameStarted === false) {
      this.wsStartLogic(data)
    } else if (data.data.question === 'winner' && this.gameStarted === true) {
      this.wsWinnerLogic(data)
    } else if (data.data.hit !== undefined) {
      this.wsHitLogic(data)
    } else {
      const tileX = parseInt(data.data[0])
      const tileY = parseInt(data.data[1])
      this.myTurn = true
      this.turnText.innerHTML = 'Your turn'
      this.gameLoopRecieve({ x: tileX, y: tileY })
    }
  }

  /**
   * WebSocket start function for when the game is initialized
   *
   * @param {*} data Data being recieved from websocket
   */
  wsStartLogic (data) {
    if (data.data.answer === null) {
      if (this.myTurn === false) {
        this.wsSend({ question: 'myturn?', answer: true })
        this.turnText.innerHTML = 'Waiting for opponent...'
        this.gameStarted = true
      }
    } else {
      if (data.data.answer) {
        this.myTurn = true
        this.turnText.innerHTML = 'Your turn'
        this.gameStarted = true
      }
    }
  }

  /**
   * WebSocket winner function for when a winner is recieved.
   *
   * @param {*} data Data being recieved from websocket
   */
  wsWinnerLogic (data) {
    console.log(data)
    if (data.data.answer === true) {
      this.turnText.innerHTML = 'You won!'
      this.myTurn = false
      this.gameStarted = false
    }
  }

  /**
   * WebSocket hit function for when a hit is recieved.
   *
   * @param {*} data Data being recieved from websocket
   */
  wsHitLogic (data) {
    const tileX = parseInt(data.data.x)
    const tileY = parseInt(data.data.y)
    if (data.data.hit) {
      this.opponentBoard[tileX][tileY].isHit = true
      document.getElementById(`o${tileX}${tileY}`).style.backgroundImage = `url(${this.board[tileX][tileY].imgSrc.checked})`
      document.getElementById(`o${tileX}${tileY}`).style.opacity = '0.5'
    } else {
      this.opponentBoard[tileX][tileY].isHit = true
      document.getElementById(`o${tileX}${tileY}`).style.backgroundImage = `url(${this.board[tileX][tileY].imgSrc.checked})`
    }
  }

  /**
   * WebSocket send function for sending data to the websocket.
   *
   * @param {*} data Data being sent to websocket
   */
  wsSend (data) {
    this.ws.send(JSON.stringify({
      type: 'message',
      data,
      username: this.userName,
      channel: 'Battleship',
      key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
    }))
  }
}
