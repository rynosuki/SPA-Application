export default class Application {
  constructor () {
    this.moving = false
    this.offsetX = 0
    this.offsetY = 0
    this.appName = ''

    this.body = document.createElement('div')
    this.body.className = 'appBody'
    this.header = document.createElement('div')
    this.header.className = 'appHeader'
    this.main = document.createElement('div')

    this.closeContainer = document.createElement('div')
    this.closeContainer.className = 'appCloseButton'
    this.closeButton = document.createElement('button')
    this.closeContainer.append(this.closeButton)

    this.header.append(this.closeContainer)

    this.body.appendChild(this.header)
    this.body.appendChild(this.main)
    this.body.draggable = true

    this.body.addEventListener('dragstart', e => {
      this.offsetX = e.layerX
      this.offsetY = e.layerY
    })

    this.body.addEventListener('dragend', e => {
      this.body.style.left = `${e.clientX - this.offsetX}px`
      this.body.style.top = `${e.clientY - this.offsetY}px`
    })

    this.header.addEventListener('click', e => {
      if (e.target.className === 'appCloseButton') {
        e.target.parentNode.parentNode.remove()
      }
    })
  }
}
