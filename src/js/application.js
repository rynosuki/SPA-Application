export default class Application {
  constructor () {
    this.isDragging = false
    this.xOffset = 0
    this.yOffset = 0
    this.currentX = undefined
    this.currentY = undefined
    this.initialX = undefined
    this.initialY = undefined

    this.appName = ''

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
    this.closeContainer.append(this.closeButton)

    this.header.append(this.closeContainer)

    this.body.appendChild(this.header)
    this.body.appendChild(this.main)

    this.header.addEventListener('click', e => {
      if (e.target.className === 'appCloseButton') {
        e.target.parentNode.parentNode.remove()
      }
    })

    this.header.addEventListener('mousedown', (e) => {
      e.target.focus()
      this.initialX = e.clientX - this.xOffset
      this.initialY = e.clientY - this.yOffset

      if (e.target === this.header) {
        this.isDragging = true
      }
    })

    this.header.addEventListener('mouseup', () => {
      this.initialX = this.currentX
      this.initialY = this.currentY

      this.isDragging = false
    })

    this.header.addEventListener('mousemove', (e) => {
      if (this.isDragging) {
        e.preventDefault()
        this.currentX = e.clientX - this.initialX
        this.currentY = e.clientY - this.initialY

        this.xOffset = this.currentX
        this.yOffset = this.currentY

        this.setTranslate(this.currentX, this.currentY, this.body)
      }
    })
  }

  setTranslate (xPos, yPos, el) {
    el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`
  }
}
