export default class Application {
  // Create an application object.
  constructor () {
    this.isDragging = false
    this.xOffset = 0
    this.yOffset = 0
    this.currentX = undefined
    this.currentY = undefined
    this.initialX = undefined
    this.initialY = undefined

    this.appName = ''
    this.domElement = undefined
    this.minimized = false

    // Create the app window.
    this.body = document.createElement('div')
    this.body.className = 'app'
    this.body.tabIndex = 0
    this.header = document.createElement('div')
    this.header.className = 'appHeader'
    this.main = document.createElement('div')
    this.main.className = 'appMain'

    this.closeContainer = document.createElement('div')
    this.closeContainer.className = 'appCloseButton'
    this.closeButton = document.createElement('button')
    this.closeButton.className = 'appCloseButton'
    this.closeContainer.append(document.createTextNode('X'))
    this.closeContainer.append(this.closeButton)

    this.minimizeContainer = document.createElement('div')
    this.minimizeContainer.className = 'appMinimizeButton'
    this.minimizeContainer.append(document.createTextNode('_'))

    this.header.append(this.minimizeContainer)
    this.header.append(this.closeContainer)

    this.body.appendChild(this.header)
    this.body.appendChild(this.main)

    // Add event listener to close the app.
    this.header.addEventListener('click', e => {
      if (e.target.className === 'appCloseButton') {
        e.target.parentNode.parentNode.remove()
        this.closeApp()
      } else if (e.target.className === 'appMinimizeButton') {
        this.minimizeApp(e)
      }
    })

    // Add event listeners to drag the app.
    this.header.addEventListener('mousedown', (e) => {
      this.initialX = e.clientX - this.xOffset
      this.initialY = e.clientY - this.yOffset

      if (this.header.contains(e.target) && e.target.className !== 'appCloseButton') {
        this.isDragging = true
      }
    })

    this.header.addEventListener('mouseup', () => {
      this.initialX = this.currentX
      this.initialY = this.currentY

      this.isDragging = false
    })

    document.querySelector('body').parentElement.addEventListener('mousemove', e => {
      if (this.isDragging) {
        e.preventDefault()
        this.currentX = e.clientX - this.initialX
        this.currentY = e.clientY - this.initialY
        this.xOffset = this.currentX
        this.yOffset = this.currentY

        this.body.style.transform = `translate3d(${this.currentX}px, ${this.currentY}px, 0)`
      }
    })

    this.body.addEventListener('focus', (e) => {
      this.header.style.backgroundColor = 'rgb(160, 160, 160)'
      this.body.style.zIndex = 1000
      this.domElement.style.border = '2px solid #000'
    })

    this.body.addEventListener('focusout', (e) => {
      this.header.style.backgroundColor = 'grey'
      this.body.style.zIndex = 0
      this.domElement.style.border = 'none'
    })
  }

  setDomElement (domElement) {
    this.domElement = domElement
  }

  getDomElement () {
    return this.domElement
  }

  closeApp () {
    this.body.remove()
    this.domElement.remove()
  }

  minimizeApp () {
    this.minimized = !this.minimized
    if (this.minimized === false) {
      this.header.style.backgroundColor = 'rgb(160, 160, 160)'
      this.body.style.zIndex = 1000
      this.domElement.style.border = '2px solid #000'
    } else {
      this.header.style.backgroundColor = 'grey'
      this.body.style.zIndex = 0
      this.domElement.style.border = 'none'
    }
    this.header.parentNode.className = this.minimized ? 'appMinimized' : 'app'
  }
}
