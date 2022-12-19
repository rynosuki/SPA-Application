import Battleship from './battleship.js'
import Chat from './chat.js'
import Memory from './memory.js'

const header = document.querySelector('.header')
const body = document.querySelector('.body')
const footer = document.querySelector('.footer')
const activeApps = []

renderApps()
renderTime()

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
    let game
    switch (e.target.name) {
      case 'memoryapp':
        game = new Memory()
        break
      case 'chatapp':
        game = new Chat()
        break
      case 'battleshipapp':
        game = new Battleship()
        break
    }
    activeApps.push(game)
    game.renderWindow(body)
  }
})

/**
 *
 */
function renderTime () {
  const tempText = document.createElement('label')
  tempText.id = 'clock'
  tempText.style.position = 'absolute'
  tempText.style.zIndex = '100'
  tempText.style.color = 'white'
  tempText.style.right = '10px'
  tempText.style.top = '5px'
  header.appendChild(tempText)
  displayTime()
  setInterval(displayTime, 10000)
}

/**
 *
 */
function displayTime () {
  // get the current time
  const currentTime = new Date()

  // extract the hours, minutes, and seconds from the current time
  let hours = currentTime.getHours()
  let minutes = currentTime.getMinutes()

  // add a leading zero to the hours, minutes, and seconds if they are less than 10
  if (hours < 10) {
    hours = '0' + hours
  }
  if (minutes < 10) {
    minutes = '0' + minutes
  }

  // create a string that represents the current time
  const currentTimeString = hours + ':' + minutes

  // display the current time
  document.getElementById('clock').innerHTML = currentTimeString
}
