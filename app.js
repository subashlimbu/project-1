function main() {
  const width = 20
  const gridCellCount = width * width
  const grid = document.querySelector('.grid')
  const cell = document.querySelector('div')
  const playerScore = document.querySelector('.playerScore')
  const playerlevel = document.querySelector('.levels')
  const playerLives = document.querySelector('.lives')
  const startScreen = document.querySelector('.startScreen')
  const startGame = document.querySelector('.start')
  const instruction = document.querySelector('.instruction')
  const displayScore = document.querySelector('.display-score')
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
  let bombInterval
  let gameStarted = false
  const shootAlienAudio = new Audio('sounds/shoot.wav')
  const alienDieAudio = new Audio('sounds/invaderkilled.wav')
  const playerDieAudio = new Audio('sounds/explosion.wav')



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
        // console.log(invader)
        if (invader >= 380) {
          clearInterval(intervalId)
        }
      })
    }, 500)
    // bombInterval = setInterval(() => {
    //   startBomb()
    // }, 2000)
  }
  // alienMoving()


  function startBomb() {
    // console.log(randomComputerIndex)      
    const endBomb = setInterval(() => {
      const alienFront = alienArray.slice(-11)
      // console.log(alienFront)
      const randomComputerIndex = Math.floor(Math.random() * alienFront.length)
      let dropBomb = alienFront[randomComputerIndex]
      dropBomb += 20
      cells[dropBomb].classList.add('bomb')

      const dropBombId = setInterval(() => {
        if (dropBomb < 380) {
          cells[dropBomb].classList.remove('bomb')
          if (dropBomb + 20 < 380) {
            dropBomb += 20
            cells[dropBomb].classList.add('bomb')
          } else {
            cells[dropBomb].classList.remove('bomb')
            clearInterval(dropBombId)

            // dropBomb = 0
          }
        }
        // if (cells[dropBomb].classList.contains('player')) {
        //   cells[dropBomb].classList.remove('bomb')
        //   cells[player].classList.remove('player')
        //   console.log('hello')
        //   lives -= 1
        //   playerLives.innerHTML = lives
        //   playerDieAudio.play()
        //   checkLoseGame()
        // } else {


        // clearInterval(dropBombId) 
      }, 500)


    }, 2000)
  }

  let alienMovingTimer

  function checkWinGame() {
    if (alienArray.length === 0) {
      level += 1
      playerLevel.innerHTML = level
      clearInterval(alienMovingTimer)
    }
  }

  function checkLoseGame() {
    playerLives.innerHTML = lives
    if (lives < 0) {
      clearInterval(alienMovingTimer)
      // endGame()
    } else {
      alienArray.forEach((elem) => {
        if (elem >= width * width - width) {
          clearInterval(alienMovingTimer)
          // endGame()
        }
      })
    }
  }

  function removeBombLaser() {
    if (cell[bombIndex].classList.contains(laserIndex)) {
      cells[bombIndex].classList.remove('bomb')
      cells[laserIndex].classList.remove('laser')
      clearInterval(intervalId)
    }
  }

  function endGame() {
    alert(`You died at level ${level}`)
    alert(`Your score is ${score} `)
  }

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
          alienDieAudio.play()
          alienArray.splice(alienArray.indexOf(laserIndex), 1)
          clearInterval(laserInterval)
          score += 20
          playerScore.innerHTML = score
          // checkWinGame()
        } else {
          cells[laserIndex].classList.remove('laser')
          laserIndex -= width
          cells[laserIndex].classList.add('laser')
          shootAlienAudio.play()


          // removeBombLaser() 
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
    startScreen.style.display = 'none'
    startGame.style.display = 'none'
    grid.style.display = 'flex'
    alienMoving()
    checkLoseGame()
    startBomb()
    // updateScore()
    // endgame()
  })
}

window.addEventListener('DOMContentLoaded', main)


// function renderList(scores, scoresList) {
//   const array = scores.sort((playerA, playerB) => playerB.score - playerA.score).map(player => {
//     return `<li>
//       ${player.name} has <strong>${player.score}</strong> apples.
//     </li>`
//   })
//   scoresList.innerHTML = array.join('')
// }

// function displayScore() {
//   let scores = []
//   const scoresList = document.querySelector('ol')
//   const playButton = document.querySelector('h3')

//   if (localStorage) {
//     const players = JSON.parse(localStorage.getItem('players'))
//     if (players) {
//       scores = players
//       renderList(scores, scoresList)
//     }
//   }

//   playButton.addEventListener('click', () => {
//     const newName = prompt('By what name are you known?')
//     const newScore = prompt('How many apples do you possess?')
//     const player = { name: newName, score: newScore }
//     scores.push(player)
//     renderList(scores, scoresList)
//     if (localStorage) {
//       localStorage.setItem('players', JSON.stringify(scores))
//     }
//   })

// }

// window.addEventListener('DOMContentLoaded', displayScore)