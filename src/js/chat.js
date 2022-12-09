import Application from './application'

export default class Chat extends Application {
  constructor () {
    super()
    this.appName = 'Chat'
    this.maxMessageLength = 24

    this.messages = document.createElement('div')
    this.ws = new WebSocket('wss://courselab.lnu.se/message-app/socket')

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.username !== 'The Server') {
        this.renderMessage(data)
      }
    }
  }

  renderChat (body) {
    this.body.className = 'app'
    this.body.id = 'chat'
    this.body.style.left = `${body.clientWidth / 2}px`
    this.body.style.top = `${(body.clientHeight - 80) / 2}px`
    this.body.style.paddingBottom = '10px'

    const title = document.createElement('h1')
    title.innerText = 'Chat App'
    this.header.appendChild(title)

    this.messages.className = 'messagesDiv'
    this.body.appendChild(this.messages)

    let para = document.createElement('p')
    para.innerHTML = 'poop'
    this.messages.append(para)
    para = document.createElement('p')
    para.innerHTML = 'Poop'
    this.messages.append(para)
    para = document.createElement('p')
    para.innerHTML = 'Poop'
    this.messages.append(para)
    para = document.createElement('p')
    para.innerHTML = 'Poop'
    this.messages.append(para)
    para = document.createElement('p')
    para.innerHTML = 'Poop'
    this.messages.append(para)
    para = document.createElement('p')
    para.innerHTML = 'Poop'
    this.messages.append(para)
    para = document.createElement('p')
    para.innerHTML = 'Poop'
    this.messages.append(para)

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

    body.appendChild(this.body)

    button.addEventListener('click', () => {
      this.sendMessage(input.value, 'username', 'channel')
      input.value = ''
    })
  }

  sendMessage (message, username, channel) {
    if (message.length > this.maxMessageLength) {
      return
    }
    this.ws.send(JSON.stringify({
      type: 'message',
      data: message,
      username,
      channel,
      key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
    }))
  }

  renderMessage (data) {
    console.log(data)
    const message = document.createElement('p')
    message.innerHTML = data.data
    this.messages.append(message)
  }
}
