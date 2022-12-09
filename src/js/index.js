import Battleship from './battleship.js'
import Chat from './chat.js'
import Memory from './memory.js'

// const header = document.querySelector('.header')
const body = document.querySelector('.body')
const footer = document.querySelector('.footer')
let moving = false
const clickX = 0
const clickY = 0
const activeApps = []

renderApps()

/**
 *
 */
function renderApps () {
  const apps = ['memoryapp', 'chatapp', 'battleshipapp']
  for (const appName of apps) {
    console.log(appName)
    const tempDiv = document.createElement('div')
    const tempElement = document.createElement('button')
    tempElement.style.display = 'none'
    tempDiv.append(tempElement)

    tempDiv.name = appName
    tempDiv.style.width = '50px'
    tempDiv.style.height = '50px'
    tempDiv.style.backgroundImage = `url(../img/apps/${appName}.png)`
    footer.append(tempDiv)
  }
}

footer.addEventListener('pointerdown', function (e) {
  if (e.target.name !== undefined) {
    if (e.target.name === 'memoryapp') {
      const game = new Memory()
      activeApps.push(game)
      game.renderGame(body)
    } else if (e.target.name === 'chatapp') {
      const game = new Chat()
      activeApps.push(game)
      game.renderChat(body)
    } else if (e.target.name === 'battleshipapp') {
      const game = new Battleship()
      activeApps.push(game)
      game.renderGame(body)
    }
    console.log(e.target.name)
  }
})

addEventListener('pointerup', function (e) {
  moving = false
})

addEventListener('pointermove', function (e) {
  if (moving && e.target !== body) {
    e.target.style.left = `${e.clientX - clickX}px`
    e.target.style.top = `${e.clientY - clickY}px`
  }
})
