import Application from './application'

/**
 * Chat application
 */
export default class Chat extends Application {
  constructor () {
    super()
    this.appName = 'Chat'
    this.maxMessageLength = 24
    this.listeningChannel = 'Robin'
    this.userName = sessionStorage.getItem('username')
    this.windowCreated = false

    this.messages = document.createElement('div')
    this.getUsername = document.createElement('div')
    this.currentChannel = document.createElement('label')

    this.ws = new WebSocket('wss://courselab.lnu.se/message-app/socket')
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.username !== 'The Server') {
        if (data.channel === this.listeningChannel) {
          this.renderMessage(data)
        }
      }
    }
  }

  /**
   * Renders the chat window
   *
   * @param {*} body The body of the window
   */
  renderWindow (body) {
    // Clear the main div
    while (this.main.firstChild) {
      this.main.removeChild(this.main.lastChild)
    }

    if (!this.windowCreated) {
      this.windowCreated = true
      // Setup the body
      this.body.className = 'app'
      this.body.id = 'chat'
      this.body.style.left = `${body.clientWidth / 2}px`
      this.body.style.top = `${(body.clientHeight - 80) / 2}px`
      this.body.style.paddingBottom = '10px'
      body.appendChild(this.body)

      // Setup the header
      if (this.header.lastChild.textContent !== 'Chat App') {
        const title = document.createElement('h1')
        title.innerText = 'Chat App'
        this.header.appendChild(title)
      }
    }

    // If the user has not set a username, render the username input
    if (this.userName === null) {
      this.renderGetUsername(body)
      return
    }

    // Setup the main
    this.messages.className = 'messagesDiv'

    const divUsername = document.createElement('div')
    const textUserName = document.createElement('p')
    textUserName.id = 'usernameChat'
    textUserName.innerText = 'Username: ' + this.userName
    divUsername.appendChild(textUserName)
    this.main.appendChild(divUsername)

    divUsername.addEventListener('click', () => this.changeUsername())

    this.currentChannel.innerText = 'Channel: ' + this.listeningChannel
    this.main.appendChild(this.currentChannel)
    this.main.appendChild(this.messages)

    // Setup the input div
    const inputDiv = document.createElement('div')
    inputDiv.className = 'inputDiv'
    this.main.appendChild(inputDiv)

    // Setup the input field
    const input = document.createElement('input')
    input.type = 'text'
    input.id = 'message-input'
    input.placeholder = 'Enter your message'
    inputDiv.appendChild(input)

    // Setup the send button
    const button = document.createElement('button')
    button.id = 'send-button'
    button.innerText = 'Send'
    inputDiv.appendChild(button)

    // Add event listener to the send button to use the sendMessage function
    button.addEventListener('click', () => {
      if (input.value.includes('/join')) {
        this.listeningChannel = input.value.split(' ')[1]
        this.currentChannel.innerText = 'Channel: ' + this.listeningChannel
      } else {
        this.sendMessage(input.value)
      }
      input.value = ''
    })

    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        button.click()
      }
    })
  }

  /**
   * Sends a message to the server
   *
   * @param {*} message The message to send
   */
  sendMessage (message) {
    // Check if message is longer than 24 characters if so return
    if (message.length > this.maxMessageLength) {
      return
    }

    // Check if message is in channel Robin if so cypher and send
    if (this.listeningChannel === 'Robin') {
      message = this.cypher(message, 'cypher')
    }

    this.ws.send(JSON.stringify({
      type: 'message',
      data: message,
      username: this.userName,
      channel: this.listeningChannel,
      key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
    }))
  }

  /**
   * Renders the message to the chatbox.
   *
   * @param {*} data The data to render
   */
  renderMessage (data) {
    // Check if message is empty if so return
    if (data.data === '') {
      return
    }
    const message = document.createElement('p')

    // Check if message is in channel Robin if so decypher
    if (data.channel === 'Robin') {
      message.innerHTML = data.username + ': ' + this.cypher(data.data, 'decypher') + ' ' + data.data
    } else if (data.channel === 'Battleship') {
      console.log(data)
      if (data.data.startsWith('play ')) {
        message.innerHTML = data.username + ': ' + data.data.split('play ')[1]
      }
    } else {
      message.innerHTML = data.username + ': ' + data.data
    }

    // Remove any entry above 20
    if (this.messages.children.length > 20) {
      this.messages.removeChild(this.messages.firstChild)
    }
    this.messages.append(message)
    this.messages.scrollTop = this.messages.scrollHeight
  }

  /**
   * Cyphers the message if in encrypted channel.
   *
   * @param {*} message The message to cypher.
   * @param {*} type If the message should be cyphered or decyphered.
   * @returns {*} The cyphered message.
   */
  cypher (message, type) {
    // Cypher using a caesar cypher
    const cypher = 'abcdefghijklmnopqrstuvwxyzåäöABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ'
    const cypherMessage = []
    if (type === 'cypher') {
      for (const c of message) {
        cypherMessage.push(cypher[(cypher.indexOf(c) + 3) % cypher.length])
      }
    } else {
      for (const c of message) {
        cypherMessage.push(cypher[(cypher.indexOf(c) + cypher.length - 3) % cypher.length])
      }
    }
    return cypherMessage.join('')
  }

  // Sets the username then renders get username
  changeUsername () {
    this.userName = null
    this.renderGetUsername(this.body)
  }
}
