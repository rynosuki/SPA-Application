export default class Application {
  constructor () {
    this.moving = false
    this.offsetX = 0
    this.offsetY = 0

    this.body = document.createElement('div')
    this.header = document.createElement('div')
    this.main = document.createElement('div')
    this.body.appendChild(this.header)
    this.body.appendChild(this.main)
    this.body.draggable = true

    this.header.style.height = '40px'
    this.header.style.width = 'auto'
    this.header.style.background = 'grey'
    this.header.style.marginBottom = '10px'

    this.body.addEventListener('dragstart', e => {
      this.offsetX = e.layerX
      this.offsetY = e.layerY
    })

    this.body.addEventListener('dragend', e => {
      this.body.style.left = `${e.clientX - this.offsetX}px`
      this.body.style.top = `${e.clientY - this.offsetY}px`
    })
  }
}
