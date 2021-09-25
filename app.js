const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const restartBtn = document.querySelector('.restart-btn')
const backgrounds = [
  'url("https://cdn.betterttv.net/emote/5ca7591926dfd77429327bb6/3x")',
  'url("https://cdn.betterttv.net/emote/60a8d02c67644f1d67e8ace7/3x")',
  'url("https://cdn.betterttv.net/emote/5c548025009a2e73916b3a37/3x")',
  'url("https://cdn.betterttv.net/emote/5dbc173f27360247dd64e4ae/3x")',
  'url("https://cdn.betterttv.net/emote/5ed0fd17f54be95e2a835054/3x")',
  'url("https://cdn.betterttv.net/emote/5c0e1a3c6c146e7be4ff5c0c/3x")',
  'url("https://cdn.betterttv.net/emote/610b661176ea4e2b9f7570d4/3x")',
]
const backgroundsLength = backgrounds.length - 1
let time = 0
let score = 0
let failedScore = 0

startBtn.addEventListener('click', (event) => {
  event.preventDefault()
  screens[0].classList.add("up")
})

restartBtn.addEventListener('click', () => {
  const screenLength = screens.length
  for (let index = 0; index < screenLength; index++) {
    screens[index].classList.remove('up')
  }
  timeEl.parentNode.classList.remove('hide')
  board.innerHTML = ''
  clearInterval(intervalID)
  score = 0
  failedScore = 0
})

timeList.addEventListener('click', (event) => {
  if (event.target.classList.contains('time-btn')) {
    time = parseInt(event.target.getAttribute('data-time'))
    startGame()
  }
})

board.addEventListener('click', (event) => {
  if (event.target.classList.contains('circle')) {
    score++;
    event.target.remove()
    createRandomCircle()
  }
  if (event.target.classList.contains('loseBoard')) {
    failedScore++
  }
})

let intervalID = 0

function startGame() {
  createLoseBoard()
  createRandomCircle()
  intervalID = setInterval(decreaseTime, 1000)
  screens[1].classList.add('up')
  setTime(time)
}

function decreaseTime() {
  if (time === 0) {
    finishGame()
    clearInterval(intervalID)
  } else {
    let current = --time
    if (current < 10) {
      current = `0${current}`
    }
    setTime(current)
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`
}

function finishGame() {
  timeEl.parentNode.classList.add('hide')
  board.innerHTML = `<h1>Убито пепег: <span class="primary">${score}</span>                     Промахов: <span class="primary">${failedScore}</h1>`
}

function createRandomCircle() {
  const circle = document.createElement('div')
  const background = getRandomBackground()
  let size = getRandomNumber(12, 120)
  const { width, height } = board.getBoundingClientRect()

  circle.classList.add('circle')
  if (size > 100) {
    circle.style.backgroundImage = backgrounds[backgroundsLength]
    size = 200
  } else if (size < 100 && size > 60) {
    size = 60
    circle.style.backgroundImage = background
  } else {
    circle.style.backgroundImage = background
  }

  const x = getRandomNumber(0, width - size)
  const y = getRandomNumber(0, height - size)

  circle.style.width = `${size}px`
  circle.style.height = `${size}px`
  circle.style.left = `${x}px`
  circle.style.top = `${y}px`

  board.append(circle)
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

function getRandomBackground() {
  const index = Math.floor(Math.random() * (backgrounds.length - 1))
  return backgrounds[index]
}

function createLoseBoard() {
  const loseBoard = document.createElement('div')
  const { width, height } = board.getBoundingClientRect()
  const x = width
  const y = height

  loseBoard.classList.add('loseBoard')

  loseBoard.style.width = `${x}px`
  loseBoard.style.height = `${y}px`

  board.append(loseBoard)
}