import Application from './application'

export default class Chat extends Application {
  constructor () {
    super()
    this.appName = 'Chat'
    this.maxMessageLength = 24
    this.listeningChannel = 'Robin'
    this.userName = localStorage.getItem('username')

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

  renderGetUsername (body) {
    const inputDiv = document.createElement('div')
    inputDiv.className = 'inputDiv'

    const input = document.createElement('input')
    input.type = 'text'
    input.id = 'message-input'
    input.placeholder = 'Enter your username'
    inputDiv.appendChild(input)

    const button = document.createElement('button')
    button.id = 'send-button'
    button.innerText = 'Send'
    inputDiv.appendChild(button)

    this.body.appendChild(inputDiv)
    button.addEventListener('click', () => {
      const userName = input.value
      localStorage.setItem('username', userName)
      this.renderChat(body)
      inputDiv.remove()
    })
  }

  renderChat (body) {
    while (this.main.firstChild) {
      this.main.removeChild(this.main.lastChild)
    }
    this.body.className = 'app'
    this.body.id = 'chat'
    this.body.style.left = `${body.clientWidth / 2}px`
    this.body.style.top = `${(body.clientHeight - 80) / 2}px`
    this.body.style.paddingBottom = '10px'
    body.appendChild(this.body)

    if (this.header.lastChild.textContent !== 'Chat App') {
      const title = document.createElement('h1')
      title.innerText = 'Chat App'
      this.header.appendChild(title)
    }

    if (this.userName === null) {
      this.renderGetUsername(body)
      return
    }

    this.messages.className = 'messagesDiv'
    this.body.appendChild(this.messages)

    this.currentChannel.innerText = 'Channel: ' + this.listeningChannel
    this.main.appendChild(this.currentChannel)

    const inputDiv = document.createElement('div')
    inputDiv.className = 'inputDiv'
    this.body.appendChild(inputDiv)

    const input = document.createElement('input')
    input.type = 'text'
    input.id = 'message-input'
    input.placeholder = 'Enter your message'
    inputDiv.appendChild(input)

    const button = document.createElement('button')
    button.id = 'send-button'
    button.innerText = 'Send'
    inputDiv.appendChild(button)

    button.addEventListener('click', () => {
      if (input.value.includes('/join')) {
        this.listeningChannel = input.value.split(' ')[1]
        this.currentChannel.innerText = 'Channel: ' + this.listeningChannel
      } else {
        this.sendMessage(input.value, this.userName, 'Robin')
      }
      input.value = ''
    })
  }

  sendMessage (message, username) {
    if (message.length > this.maxMessageLength) {
      return
    }
    this.ws.send(JSON.stringify({
      type: 'message',
      data: this.cypher(message, this.listeningChannel),
      username,
      channel: this.listeningChannel,
      key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
    }))
  }

  renderMessage (data) {
    console.log(data)
    if (data.channel === 'Robin') {
      const message = document.createElement('p')
      message.innerHTML = this.decypher(data.data, this.listeningChannel)
      this.messages.append(message)
    } else {
      const message = document.createElement('p')
      message.innerHTML = data.data
      this.messages.append(message)
    }
  }

  cypher (message, listeningChannel) {
    const cypher = 'abcdefghijklmnopqrstuvwxyzåäöABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ'
    const cypherMessage = []
    if (listeningChannel === 'Robin') {
      for (let i = 0; i < message.length; i++) {
        const index = cypher.indexOf(message[i])
        if (index !== -1) {
          cypherMessage.push(cypher[(index + 3) % cypher.length])
        } else {
          cypherMessage.push(message[i])
        }
      }
    } else {
      return message
    }
    return cypherMessage.join('')
  }

  decypher (message, listeningChannel) {
    const cypher = 'abcdefghijklmnopqrstuvwxyzåäöABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ'
    const cypherMessage = []
    if (listeningChannel === 'Robin') {
      for (let i = 0; i < message.length; i++) {
        const index = cypher.indexOf(message[i])
        if (index !== -1) {
          cypherMessage.push(cypher[(index + cypher.length - 3) % cypher.length])
        } else {
          cypherMessage.push(message[i])
        }
      }
    } else {
      return message
    }
    return cypherMessage.join('')
  }
}
