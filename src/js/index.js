import Memory from "./memory.js";

const body = document.querySelector("body")
let moving = false
let clickX = 0
let clickY = 0
let focused = new Memory()

addEventListener('pointerdown', function (e) {
  moving = true
  if (e.target == body) {
    focused.renderGame(e)
  }
});

addEventListener('pointerup', function (e) {
  moving = false
});

// document.addEventListener('contextmenu', e => {
//   e.preventDefault()
//   let workDiv = document.createElement('div')
//   workDiv.className = 'contextMenu'
//   workDiv.style.left = `${e.clientX}px`
//   workDiv.style.top = `${e.clientY}px`
//   body.appendChild(workDiv)
// });

addEventListener('pointermove', function (e) {
  if (moving && e.target != body) {
    e.target.style.left = `${e.clientX - clickX}px`
    e.target.style.top = `${e.clientY - clickY}px`
  }
});