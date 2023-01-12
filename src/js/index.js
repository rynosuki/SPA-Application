import Battleship from './battleship.js'
import Chat from './chat.js'
import Memory from './memory.js'

const header = document.querySelector('.header')
header.style.zIndex = '1000'
const body = document.querySelector('.body')
const footer = document.querySelector('.footer')
footer.style.zIndex = '1000'
const activeApps = []

initMain()

/**
 * Initializes program
 */
function initMain () {
  renderUsername()
  renderLogin()
  renderApps()
  renderTime()
}

/**
 * Renders the login screen
 */
function renderLogin () {
  const tempDiv = document.createElement('div')
  tempDiv.className = 'login'

  const tempLabel = document.createElement('p')
  tempLabel.innerHTML = 'Username:'

  const tempInput = document.createElement('input')
  tempInput.type = 'text'
  tempInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      tempButton.click()
    }
  })

  const tempButton = document.createElement('button')
  tempButton.innerHTML = 'Login'
  tempButton.addEventListener('click', () => {
    if (tempInput.value !== '') {
      sessionStorage.setItem('username', tempInput.value)
      tempDiv.remove()
      document.getElementById('username').innerHTML = `Logged in as ${tempInput.value}`
    }
  })

  tempDiv.appendChild(tempLabel)
  tempDiv.appendChild(tempInput)
  tempDiv.appendChild(tempButton)
  body.appendChild(tempDiv)
}

/**
 * Render username top left corner
 */
function renderUsername () {
  const userNameDiv = document.createElement('div')
  const userNameText = document.createElement('p')
  userNameText.id = 'username'
  userNameText.innerHTML = 'Not currently logged in.'
  userNameText.style.color = 'white'
  userNameDiv.append(userNameText)

  const userNameTooltip = document.createElement('p')
  userNameTooltip.id = 'usernameTooltip'
  userNameTooltip.innerHTML = 'Click to change username'
  userNameTooltip.style.display = 'none'
  userNameDiv.append(userNameTooltip)
  header.append(userNameDiv)

  userNameDiv.addEventListener('mouseover', () => {
    userNameTooltip.style.display = 'block'
    userNameTooltip.style.backgroundColor = 'black'
    userNameTooltip.style.width = 'fit-content'
    userNameTooltip.style.paddingLeft = '5px'
    userNameTooltip.style.paddingRight = '5px'
  })

  userNameDiv.addEventListener('mouseleave', () => {
    userNameTooltip.style.display = 'none'
  })

  userNameDiv.addEventListener('click', () => {
    renderLogin()
  })
}

/**
 * Renders the app buttons
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

/**
 * Renders the clock in top right corner
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
 * Displays the current time in the top right corner
 */
function displayTime () {
  // Get the current time
  const currentTime = new Date()

  // Extract the hours, minutes, and seconds
  let hours = currentTime.getHours()
  let minutes = currentTime.getMinutes()

  // Add leading zeros, first convert hours and minutes to strings
  if (hours < 10) {
    hours = '0' + hours
  }
  if (minutes < 10) {
    minutes = '0' + minutes
  }

  // Compose the string for display
  const currentTimeString = hours + ':' + minutes

  // Display the clock
  document.getElementById('clock').innerHTML = currentTimeString
}

// Add eventlistener that starts an application.
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
