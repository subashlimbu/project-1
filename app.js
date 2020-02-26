function setupGame() {
  const width = 20
  const gridCellCount = width * width
  const grid = document.querySelector('.grid')
  const cell = document.querySelector('div')
  const playerScore = document.querySelector('.playerScore')
  const playerlevel = document.querySelector('.levels')
  const playerLives = document.querySelector('.lives')
  const startGame = document.querySelector('.start')
  const cells = []
  let player = 390
  let laser = 390
  let alienIndex = 0
  let bombIndex = 0
  let laserIndex = 0
  let timerLaserId = 0
  let computerIndex = null
  let alienArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70]
  let laserRepeat = null
  let bombId = null
  let score = 0
  let lives = 3
  let level = 1

  for (let i = 0; i < gridCellCount; i++) {
    const cell = document.createElement('div')
    cell.classList.add('cell')
    if (i === player) {
      cell.classList.add('player')
    }
    if (alienArray.includes(i)) {
      cell.classList.add('alien')
    }

    grid.appendChild(cell)
    cells.push(cell)
  }

  let alienDirection = 'right'
  let intervalId

  function alienMoving() {

    intervalId = setInterval(() => {
      if (alienDirection === 'right') {
        for (let i = 0; i < alienArray.length; i++) {
          const invader = alienArray[i]
          cells[invader].classList.remove('alien')
        }
        let rightColumn = false
        for (let i = 0; i < alienArray.length; i++) {
          const invader = alienArray[i]
          if ((invader + 1) % 20 === 0) {
            rightColumn = true
            // console.log(rightColumn)
          }
        }
        for (let i = 0; i < alienArray.length; i++) {
          let invader = alienArray[i]
          if (rightColumn) {
            invader = invader + 20
            alienDirection = 'left'
          } else {
            invader = invader + 1
          }
          alienArray[i] = invader
          cells[invader].classList.add('alien')
        }
      } else if (alienDirection === 'left') {
        for (let i = 0; i < alienArray.length; i++) {
          const invader = alienArray[i]
          cells[invader].classList.remove('alien')
        }
        let leftColumn = false
        for (let i = 0; i < alienArray.length; i++) {
          const invader = alienArray[i]
          if ((invader) % 20 === 0) {
            leftColumn = true
          }
        }
        for (let i = 0; i < alienArray.length; i++) {
          let invader = alienArray[i]
          if (leftColumn) {
            invader = invader + 20
          } else {
            invader = invader - 1
          }
          alienArray[i] = invader
          cells[invader].classList.add('alien')
        }
        if (leftColumn) {
          alienDirection = 'right'
        }
      }
      alienArray.forEach((invader) => {
        if (invader >= 380) {
          clearInterval(intervalId)
        }
      })
    }, 500)
  }
  // alienMoving()
  

  function startBomb() {

    const alienFront = alienArray.slice(-11)
    // console.log(alienFront)
    let randomComputerIndex = Math.floor(Math.random() * alienFront.length)
    // console.log(randomComputerIndex)      

    const timerBombId = setInterval(() => {
      let dropBomb = alienFront[randomComputerIndex]
      if (dropBomb >= 380) {
        if (cells[dropBomb].classList.contains('player')) {
          cells[alienFront[randomComputerIndex]].classList.remove('bomb')
          cells[player].classList.remove('player')
          lives -= 1
          checkLoseGame()
          // playerLives.innerHTML = lives
        } else {
          cells[alienFront[randomComputerIndex]].classList.remove('bomb')
          clearInterval(timerBombId)
          dropBomb = 0
          startBomb()
        }
      } else {
        cells[alienFront[randomComputerIndex]].classList.remove('bomb')
        alienFront[randomComputerIndex] += width
        cells[alienFront[randomComputerIndex]].classList.add('bomb')
      }
    }, 500)
  }
  // startBomb()

  function updateScore(newScore, score) {
    newScore.innerHTML = score
  }

  let alienMovingTimer

  function checkWinGame() {
    if (alienArray.length === 0) {
      level += 1
      playerLevel.innerHTML = level
      clearInterval(alienMovingTimer)
    }
  }

  // function remainingLives(newLives, lives) {
  //   newLives.innerHTML = lives
  // }

  function checkLoseGame() {
    playerLives.innerHTML = lives
    if (lives < 0) {
      clearInterval(alienMovingTimer)
      endGame()
    } else {
      alienArray.forEach((elem) => {
        if (elem >= width * width - width) {
          clearInterval(alienMovingTimer)
          endGame()
        }
      })
    }
  }

  function endGame() {
    alert(`You died at level ${level}`)
    alert(`Your score is ${score} `)
  }

  // let function stopStartButton() {

  // }






  document.addEventListener('keydown', (event) => {

    if (event.keyCode === 32) {
      let laserIndex = player - width
      const laserInterval = setInterval(() => {
        if (laserIndex < 21) {
          cells[laserIndex].classList.remove('laser')
          clearInterval(laserInterval)
        }
        if (cells[laserIndex].classList.contains('alien') === true) {
          cells[laserIndex].classList.remove('laser')
          cells[laserIndex].classList.remove('alien')
          alienArray.splice(alienArray.indexOf(laserIndex), 1)
          clearInterval(laserInterval)
          score += 20
          updateScore(playerScore, score)
          // checkWinGame()
        } else {
          cells[laserIndex].classList.remove('laser')
          laserIndex -= width
          cells[laserIndex].classList.add('laser')
        }
      }, 200)
    }

    if (event.key === 'ArrowRight') {
      if (player === cells.length - 1) {
        return
      }
      cells[player].classList.remove('player')
      player += 1
      cells[player].classList.add('player')
    } else if (event.key === 'ArrowLeft') {
      if (player === 0 || player === 380) {
        return
      }
      cells[player].classList.remove('player')
      player -= 1
      cells[player].classList.add('player')
    }
  })

  startGame.addEventListener('click', () => {
    alienMoving()
    startBomb()
    checkLoseGame()
    updateScore()
    endgame()
  })
}

window.addEventListener('DOMContentLoaded', setupGame)